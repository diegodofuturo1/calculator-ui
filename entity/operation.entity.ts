export type OperationType = 'addition' | 'substract' | 'multiplicate' | 'divisor';

export interface Operation {
  id: string;
  value: number;
  type: OperationType;
}
