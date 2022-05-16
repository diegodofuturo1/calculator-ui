import service from "../../service"
import CorrectTag from "../correct"
import Identifier from "../identifier"
import { useEffect, useState } from "react"
import { EntityType } from "../../entity/type/entity.type"
import { Card, Col, Layout, Row, Select, Table } from "antd"
import { EntityListType } from "../../entity/type/entity-list.type"
import { EntityColumnsType } from "../../entity/type/entity-columns.type"

const EntityTable = () => {
    const [entity, setEntity] = useState<EntityType>('operation')
    const [table, setTable] = useState<JSX.Element>()
    const [loading, setLoading] = useState(false)
    const [dataSource, setDataSource] = useState<EntityListType>({ action: [], operation: [], stage: [] })

    const columns: EntityColumnsType = {
        action: [
            {
                title: 'Id',
                dataIndex: 'id',
                key: 'id',
                render: id => <Identifier id={id}/>
            }, {
                title: 'StageId',
                dataIndex: 'stageId',
                key: 'stageId',
                render: stageId => <Identifier id={stageId}/>
            }, {
                title: 'Result',
                dataIndex: 'result',
                key: 'result',
            }, {
                title: 'Correct',
                dataIndex: 'correct',
                key: 'correct',
                render: (correct, action) => <CorrectTag value={correct} key={action.id} />
            },
        ],
        operation: [
            {
                title: 'Id',
                dataIndex: 'id',
                key: 'id',
                render: id => <Identifier id={id}/>
            }, {
                title: 'Value',
                dataIndex: 'value',
                key: 'value',
            }, {
                title: 'Type',
                dataIndex: 'type',
                key: 'type',
            },
        ],
        stage: [
            {
                title: 'Id',
                dataIndex: 'id',
                key: 'id',
                render: id => <Identifier id={id}/>
            }, {
                title: 'Level',
                dataIndex: 'level',
                key: 'level',
            }, {
                title: 'Start',
                dataIndex: 'start',
                key: 'start',
            }, {
                title: 'End',
                dataIndex: 'end',
                key: 'end',
            }, {
                title: 'Times',
                dataIndex: 'times',
                key: 'times',
            },
        ]
    }

    const entityEffect = () => {
        setLoading(true)

        const runEffect = async () => {
            const data = await service[entity].getAll()
            dataSource[entity] = data ?? []
            setDataSource(dataSource)
            setTable(rendertable())
            setLoading(false)
        }

        try {
            runEffect()
        }
        catch {
            setLoading(false)
        }
    }

    const rendertable = () => {
        switch (entity) {
            case 'action': return <Table scroll={{ x: true }} dataSource={dataSource.action} columns={columns.action} loading={loading} rowKey="id" style={{ overflow: "hidden" }} />
            case 'operation': return <Table dataSource={dataSource.operation} columns={columns.operation} loading={loading} rowKey="id" />
            case 'stage': return <Table dataSource={dataSource.stage} columns={columns.stage} loading={loading} rowKey="id" />
        }
    }

    useEffect(entityEffect, [entity])

    const select = (
        <Row>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} xxl={{ span: 4 }}>
                Banco de Dados
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 20 }} lg={{ span: 20 }} xl={{ span: 20 }} xxl={{ span: 20 }}>
                <Row justify="end">
                    <Row align="middle" style={{ marginRight: '20px' }} >Selecione Tabela:</Row>
                    <Col style={{ width: '200px' }}>
                        <Select defaultValue={"operation"} onChange={(value: EntityType) => setEntity(value)} style={{ width: '100%' }}>
                            <Select.Option key="action">Ações</Select.Option>
                            <Select.Option key="operation">Operações</Select.Option>
                            <Select.Option key="stage">Fases</Select.Option>
                        </Select>
                    </Col>
                </Row>
            </Col>
        </Row>
    )

    return <Layout style={{ padding: '20px', height: '100vh' }}>
        <Card title={select}>
            {table}
        </Card>
    </Layout>
}

export default EntityTable