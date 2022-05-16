import { Action } from "../action.entity";
import { Operation } from "../operation.entity";

export interface ActionDto extends Action {
    operations: Operation[]
}