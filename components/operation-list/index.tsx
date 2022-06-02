import { Operation } from "../../entity/operation.entity"
import OperationTag from "../operation"
import { v4 as uuidv4 } from 'uuid';

export interface OperationListProps {
    operations: Operation[]
    color?: string
}

const OperationList = (props: OperationListProps) => {
    return <>
        {props.operations.map(operation => <OperationTag color={props.color ?? "blue"} type={operation.type} value={operation.value} key={uuidv4()} />)}
    </>
}

export default OperationList