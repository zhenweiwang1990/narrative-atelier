
export interface GlobalValue {
  id: string;
  name: string;
  description: string;
  initialValue: number;
  currentValue?: number;
  type?: string;
}

export interface ValueChange {
  valueId: string;
  change: number;
}

export interface UnlockCondition {
  valueId: string;
  operator: 'gt' | 'lt' | 'eq' | 'gte' | 'lte';
  targetValue: number;
}
