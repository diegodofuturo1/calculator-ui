import { Tag } from "antd"

export interface CorrectTagProps {
    value: string
}

const CorrectTag = (props: CorrectTagProps) => {
    const { value } = props

    const color = value ? 'green' : 'red'
    const text = value ? 'correto' : 'incorreto'

    return <Tag color={color}>{text}</Tag>
}



export default CorrectTag