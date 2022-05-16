import { Operation } from "../../entity/operation.entity"
import OperationTag from "../operation"

export interface OperationListProps {
    operations: Operation[]
}

const OperationList = (props: OperationListProps) => {
    return <>
        {props.operations.map(operation => <OperationTag color="blue" type={operation.type} value={operation.value} key={operation.id} />)}
    </>
}

export default OperationList