import { LoadingOutlined } from "@ant-design/icons"
import { Row } from "antd"
import { ActionDto } from "../../entity/dtos/action.dto"
import OperationTag from "../operation"
import OperationList from "../operation-list"
import { v4 as uuidv4 } from 'uuid';

interface ActionListProps {
    start: number
    actions: ActionDto[]
    spin?: boolean
}

const ActionList = (props: ActionListProps) => {
    
    const operationRender = (action: ActionDto) => {
        const color = action.status == 'correct' ? 'green' : action.status == 'incorrect' ? 'red' : 'blue' 

        return <Row justify="center" key={uuidv4()}>
            <OperationTag key={uuidv4()} color={color} value={props.start} />
            <OperationList color={color} operations={action.operations} />
            <OperationTag key={uuidv4()} color={color} value="=" />
            <OperationTag key={uuidv4()} color={color} value={action.result || action.result == 0 ? action.result : '?'} />
        </Row>
    }

    const actionRender = (actions: ActionDto[]) => {
        return <>{actions.map(action => operationRender(action))}</>
    }

    return actionRender(props.actions)
}

export default ActionList