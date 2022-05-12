import { Stage } from "../stage.entity";
import { Action } from "../action.entity";
import { ColumnsType } from "antd/lib/table";
import { Operation } from "../operation.entity";

export type EntityColumnsType = {
    operation: ColumnsType<Operation>;
    action: ColumnsType<Action>;
    stage: ColumnsType<Stage>;
}