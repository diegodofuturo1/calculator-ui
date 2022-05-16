import { Tag } from "antd"
import { OperationType } from "../../entity/type/operation.type"

interface OperationProps {
    type?: OperationType
    value?: number | string
    color: string
}

const simbols = {
    'addition': '+',
    'substract': '-',
    'multiplicate': '*',
    'divisor': '/',
    '0': '+',
    '1': '-',
    '2': '*',
    '3': '/',
}

const OperationTag = (props: OperationProps) => {
    const { type, value, color  } = props
    const simbol = type ? simbols[type] ?? '' : ''
    const text = value || value == 0 ? value : ''

    return <Tag style={{ padding: '5px 10px', marginRight: '10px', minWidth: '40px', textAlign: 'center' }} color={color}>{simbol} {text}</Tag>
}

export default OperationTag