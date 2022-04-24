import { NextPage } from "next";
import { Layout, Spin, Table } from 'antd'
import { ColumnsType } from "antd/lib/table";
import { Operation } from "../../entity/operation.entity";
import { useEffect, useState } from "react";
import operationService from "../../service/operation.service";
import Title from "antd/lib/skeleton/Title";

const DataBasePage: NextPage = () => {
    const columns: ColumnsType<Operation> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },{
            title: 'VALUE',
            dataIndex: 'value',
            key: 'value',
        },{
            title: 'TYPE',
            dataIndex: 'type',
            key: 'type',
        },
    ]

    const [operations, setOperations ] = useState([])

    const getOperationEffect = () => {
        const runEffect = async () => {
            const _operations = await operationService.getAllOperations()
            setOperations(_operations ?? [])
        }
        runEffect()
    }

    useEffect(getOperationEffect)

    return <Layout>

        <Table dataSource={operations} columns={columns} rowKey="id" />

    </Layout>
}

export default DataBasePage