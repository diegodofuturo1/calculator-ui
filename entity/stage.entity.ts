import { StageType } from "./type/stage.type";

export interface Stage {
  id?: string;
  start: number;
  level: number;
  end: number;
  times: number;
  status: StageType
}
