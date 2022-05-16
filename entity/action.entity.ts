import { ActionStatus } from "./type/action-status.type";

export interface Action {
  id: string;
  stageId: string;
  result: number;
  status: ActionStatus
}
