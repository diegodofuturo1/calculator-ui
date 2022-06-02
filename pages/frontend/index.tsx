import { NextPage } from "next"
import service from "../../service"
import { useEffect, useState } from "react"
import { Stage } from "../../entity/stage.entity"
import ActionList from "../../components/action-list"
import { ActionDto } from "../../entity/dtos/action.dto"
import { StageType } from "../../entity/type/stage.type"
import OperationList from "../../components/operation-list"
import { Operation, OperationType } from "../../entity/operation.entity"
import { CaretLeftOutlined, CaretRightOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons"
import { Card, Col, Layout, Row, InputNumber, Select, Button, Divider, Progress, Tooltip } from "antd"

export type FrontendPageStatus = 'ready' | 'loading-stage' | 'save-stage' | 'save-operation' | 'save-actions' | 'calculation'

const FrontendPage: NextPage = () => {

    const [id, setId] = useState('')
    const [level, setLevel] = useState(1)
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(0)
    const [times, setTimes] = useState(1)

    const [operations, setOperations] = useState<Operation[]>([])

    const [type, setType] = useState<OperationType>('addition')
    const [value, setValue] = useState(1)

    const [probability, setProbability] = useState(0)
    const [progress, setProgress] = useState(0)
    const [percent, setPercent] = useState(0)
    const [status, setStatus] = useState<StageType>("created")
    const [statusPage, setStatusPage] = useState<FrontendPageStatus>("loading-stage")

    const [actions, setActions] = useState<ActionDto[]>([])
    const [loadings, setLoadings] = useState<ActionDto[]>([])
    const [corrects, setCorrects] = useState<ActionDto[]>([])
    const [incorrects, setIncorrects] = useState<ActionDto[]>([])

    const setStage = (stage: Stage) => {
        if (stage) {
            if (stage.id && stage.id != id)
                setId(stage.id)

            if (stage.start && stage.start != start)
                setStart(stage.start)

            if (stage.end && stage.end != end)
                setEnd(stage.end)

            if (stage.times && stage.times != times)
                setTimes(stage.times)

            if (stage.status && stage.status != status)
                setStatus(stage.status)

            if (stage.level && stage.level != level)
                setLevel(stage.level)
        }
    }

    useEffect(() => {
        const runEffect = async () => {
            const _operations = await service.operation.getByStage(id)
            const list: ActionDto[] = await service.action.getByStage(id)

            const _actions: ActionDto[] = []
            const _corrects: ActionDto[] = []
            const _incorrects: ActionDto[] = []

            list.forEach(action => {
                if (action.status == 'correct')
                    _corrects.push(action)
                else if (action.status == 'incorrect')
                    _incorrects.push(action)
                else
                    _actions.push(action)
            })

            setActions(_actions)
            setCorrects(_corrects)
            setIncorrects(_incorrects)
            setOperations(_operations)

            if (status == 'calculated')
                setProgress(_operations.length && times ? _operations.length ** times : 0)
        }

        if (id)
            runEffect()
    }, [id])

    useEffect(() => {
        setProbability(operations.length && times ? operations.length ** times : 0)
    }, [operations.length, times, status])

    useEffect(() => {
        const _percent = progress / probability * 100
     
        if (_percent)
            setPercent(_percent)
        else
            setPercent(0)
    }, [progress])

    useEffect(() => {
        if (percent == 100)
            saveStatusHandler('calculated')
        
        if (actions.length > 0)
            calculate()
    }, [percent])

    const calculate = async () => {
        const action = actions.shift()

        if (!action)
            return

        const saved = await service.calculator.calculate(action.id)

        if (!saved)
            return

        setActions(actions)

        if (saved.status == 'correct')
            setCorrects([...corrects, { ...action, ...saved }])

        if (saved.status == 'incorrect')
            setIncorrects([...incorrects, { ...action, ...saved }])

        setProgress(progress + 1)
    }

    const addOperationHandler = () => {
        const runHandler = async () => {
            const operation = await service.operation.post({ type, value }, id)

            if (operation)
                setOperations([...operations, operation])
        }

        runHandler()
    }

    const saveStageHandler = () => {
        const runHandler = async () => {
            const stage = await service.stage.post({ level, start, end, times, status })

            if (id != stage.id) {
                setId(stage.id)
            }
        }

        runHandler()
    }

    const createActionHandler = () => {
        const runHandler = async () => {
            const data = await service.action.post(id)
            await service.stage.put({ id, status: 'ready' })
            setActions(data)
            saveStatusHandler('ready')
        }

        if (operations.length > 0 && times > 0)
            runHandler()
        else
            alert('Adicione alguma operação antes de criar as ações')
    }

    const calculateHandler = () => {
        setStatus('calculating')
        calculate()
    }

    const newStageHandler = () => {
        const runHandler = async () => {
            const stage: Stage = await service.stage.newStage()
            setStage(stage)
        }

        runHandler()
    }

    const loadStageHandler = () => {
        const runEffect = async () => {
            const stage: Stage = await service.stage.getByLevel(level)
            setStage(stage)
            setStatusPage('ready')
        }
        
        if (level && level > 0)
            runEffect()
    }

    const saveStatusHandler = (status: StageType) => {
        const runHandler = async () => {
            await service.stage.put({ id, status })
            setStatus(status)
        }

        runHandler()
    }

    useEffect(() => {
        switch (statusPage) {
            case 'loading-stage':
                loadStageHandler()
                break

            default:
                break
        }
    }, [statusPage])

    useEffect(() => setStatusPage('loading-stage'), [level])

    return (
        <Layout style={{ padding: '20px' }}>
            <Card title={'Frontend'} style={{ overflowY: 'scroll' }}>
                <Row justify="center">
                    <Col span={12}>
                        <Divider>
                            <Tooltip placement="bottom" title="anterior">
                                <CaretLeftOutlined
                                    onClick={() => setLevel(level - 1)}
                                    style={{ cursor: 'pointer', margin: '0px 10px' }}
                                />
                            </Tooltip>
                            Fase {level}
                            <Tooltip
                                placement="bottom"
                                title="editar"
                            >
                                <EditOutlined
                                    onClick={() => setLevel(level)}
                                    style={{ cursor: 'pointer', marginLeft: '10px' }}
                                />
                            </Tooltip>
                            <Tooltip
                                placement="bottom"
                                title="nova">
                                <PlusOutlined
                                    onClick={newStageHandler}
                                    style={{ cursor: 'pointer', marginLeft: '10px' }}
                                />
                            </Tooltip>
                            <Tooltip
                                placement="bottom"
                                title="próximo">
                                <CaretRightOutlined
                                    onClick={() => setLevel(level + 1)}
                                    style={{ cursor: 'pointer', marginLeft: '10px' }}
                                />
                            </Tooltip>
                        </Divider>
                        <Row justify="space-between">
                            <Col span={7}>
                                <InputNumber addonBefore="start" defaultValue={0} value={start} onChange={value => setStart(value)} onBlur={saveStageHandler} />
                            </Col>

                            <Col span={7}>
                                <InputNumber addonBefore="end" defaultValue={0} value={end} onChange={value => setEnd(value)} onBlur={saveStageHandler} />
                            </Col>

                            <Col span={7}>
                                <InputNumber addonBefore="times" defaultValue={1} min={1} value={times} onChange={value => setTimes(value)} onBlur={saveStageHandler} />
                            </Col>
                        </Row>
                        <Divider>Operações</Divider>
                        <Row justify="space-between">
                            <Col span={7}>
                                <Select style={{ width: '100%' }} defaultValue='addition' onChange={(type: OperationType) => setType(type)}>
                                    <Select.Option key="addition">Adição</Select.Option>
                                    <Select.Option key="substract">Subtração</Select.Option>
                                    <Select.Option key="multiplicate">Multiplicação</Select.Option>
                                    <Select.Option key="divisor">Divisão</Select.Option>
                                </Select>
                            </Col>
                            <Col span={7}>
                                <InputNumber addonBefore="value" defaultValue={1} min={1} onChange={value => setValue(value)}></InputNumber>
                            </Col>
                            <Col span={7}>
                                <Button style={{ width: '100%' }} onClick={addOperationHandler}>Adicionar</Button>
                            </Col>
                        </Row>

                        <Row justify="start">
                            <Divider></Divider>
                            <OperationList operations={operations} />
                        </Row>
                    </Col>
                </Row>
                <Row justify="center">
                    <Col span={12}>
                        <Divider>{probability < 1 ? '' : probability == 1 ? `${probability} combinação` : `${probability} combinações`}</Divider>
                        <Row justify="center">
                            <Button
                                onClick={status == 'created' ? createActionHandler : calculateHandler}
                                style={{ width: '50%' }}
                                color="green"
                            >
                                {status == 'created' ? 'Criar Ações' : 'Calcular'}
                            </Button>
                        </Row>
                        <Progress percent={percent ?? 0} status={percent < 100 || !percent ? 'active' : 'success'} style={{ display: status == 'created' ? 'none' : undefined, marginTop: '20px' }} />
                    </Col>
                </Row>
                <Row justify="center">
                    <Col span={12} style={{ minHeight: '500px' }} hidden={status == 'created'}>
                        <Divider>Resultados</Divider>
                        <ActionList actions={corrects} start={start} />
                        <Divider></Divider>
                        <ActionList actions={actions} start={start} />
                        <ActionList actions={loadings} spin start={start} />
                        <ActionList actions={incorrects} start={start} />
                    </Col>
                </Row>
            </Card>
        </Layout>
    )
}

export default FrontendPage