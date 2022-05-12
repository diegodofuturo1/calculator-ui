import { Stage } from "../stage.entity";
import { Action } from "../action.entity";
import { Operation } from "../operation.entity";

export type EntityListType = { action: Action[], operation: Operation[], stage: Stage[] };
