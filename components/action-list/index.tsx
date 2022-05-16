import { LoadingOutlined } from "@ant-design/icons"
import { Row } from "antd"
import { ActionDto } from "../../entity/dtos/action.dto"
import OperationTag from "../operation"
import OperationList from "../operation-list"

interface ActionListProps {
    start: number
    actions: ActionDto[]
}

const ActionList = (props: ActionListProps) => {
    
    const operationRender = (action: ActionDto) => {
        return <Row justify="start" key={action.id}>
            <OperationTag key={`start-${action.id}`} color="blue" value={props.start} />
            <OperationList operations={action.operations} />
            <OperationTag key={`end-${action.id}`} color="blue" value="=" />
            <OperationTag key={`result-${action.id}`} color="blue" value={action.result ?? <LoadingOutlined spin />} />
        </Row>
    }

    const actionRender = (actions: ActionDto[]) => {
        return <>{actions.map(action => operationRender(action))}</>
    }

    return actionRender(props.actions)
}

export default ActionList