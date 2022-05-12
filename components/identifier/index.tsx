import { Tag } from "antd"

interface IdentifierProps {
    id: string
}

const Identifier = (props: IdentifierProps) => {
    const { id } = props
    return <Tag style={{ cursor: 'pointer' }} color="blue">{id}</Tag>
}

export default Identifier