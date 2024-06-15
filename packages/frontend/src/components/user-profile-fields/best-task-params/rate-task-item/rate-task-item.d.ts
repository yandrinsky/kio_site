import { IRateTaskParams } from '../best-task-params';

export interface IRateTaskItem {
    name?: string;
    rate?: number;
    equalItem?: number | string;
    comparisonMethod?: string;
    index: number;
    ratesTaskParams: IRateTaskParams[];
    onSave?: (data: IRateTaskParams[]) => void;
    isSave: boolean
    setTask: any;
}
