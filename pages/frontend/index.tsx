import { NextPage } from "next"
import service from "../../service"
import { useEffect, useState } from "react"
import { Stage } from "../../entity/stage.entity"
import ActionList from "../../components/action-list"
import { ActionDto } from "../../entity/dtos/action.dto"
import { StageType } from "../../entity/type/stage.type"
import OperationList from "../../components/operation-list"
import { Operation, OperationType } from "../../entity/operation.entity"
import { Card, Col, Layout, Row, InputNumber, Select, Button, Divider, Progress } from "antd"

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

    const [actions, setActions] = useState<ActionDto[]>([])
    const [corrects, setCorrects] = useState<ActionDto[]>([])
    const [incorrects, setIncorrects] = useState<ActionDto[]>([])

    useEffect(() => console.log('[ACTIONS]', actions))
    useEffect(() => console.log('[OPERATIONS]', operations))
    useEffect(() => console.log('[STATUS]', status))
    useEffect(() => console.log('[PROGRESS]', progress))
    useEffect(() => console.log('[PERCENT]', percent))
    useEffect(() => console.log('[PROBABILITY]', probability))

    useEffect(() => {
        const runEffect = async () => {
            const stage: Stage = await service.stage.getByLevel(level)
            console.log('[STAGE]', stage)
            if (stage) {
                setId(stage.id ?? '')
                setStart(stage.start)
                setEnd(stage.end)
                setTimes(stage.times)
                setStatus(stage.status)
            }
        }

        runEffect()
    }, [level])

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
        }

        if (id)
            runEffect()
    }, [id])

    useEffect(() => {
        setProbability(operations.length ** times)

        if (status == 'calculated')
            setProgress(operations.length ** times)

    }, [operations.length, times])

    useEffect(() => {
        const _percent = progress / probability * 100
        console.log('[RESULT]', _percent)
        setPercent(_percent ?? 0)
    }, [progress])

    useEffect(() => {
        if (percent < 100) {
            if (status == 'calculating')
                calculate()
        }
        else
            setStatus('calculated')
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
            setStatus('ready')
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

    return (
        <Layout style={{ padding: '20px' }}>
            <Card title={'Frontend'} style={{ overflowY: 'scroll' }}>
                <Row justify="center">
                    <Col span={12}>
                        <Divider>Fase {level}</Divider>
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
                        <Divider></Divider>
                    </Col>
                </Row>
                <Row justify="space-around">
                    <Col span={7} style={{ minHeight: '500px' }} hidden={status == 'created' || status == 'ready'}>
                        <Divider>Corretos</Divider>
                        <ActionList actions={corrects} start={start} />
                    </Col>
                    <Col span={7} style={{ minHeight: '500px' }} hidden={status == 'created' || status == 'calculated'}>
                        <Divider>Calculando...</Divider>
                        <ActionList actions={actions} start={start} />
                    </Col>
                    <Col span={7} style={{ minHeight: '500px' }} hidden={status == 'created' || status == 'ready'}>
                        <Divider>Incorretos</Divider>
                        <ActionList actions={incorrects} start={start} />
                    </Col>
                </Row>
            </Card>
        </Layout>
    )
}

export default FrontendPage