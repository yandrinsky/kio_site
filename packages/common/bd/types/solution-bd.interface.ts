import { ITree } from '../../domain/types';

export interface ISolutionDB {
    _id: string;
    tries: string[];
    bestTryId: string | null;
    currentTryId: string;
    timestamp: number;
    ownerId: string;
    taskId: string;
}
export interface IFrame {
    state: {};
    result: {};
    timestamp: number;
    comment: string | null;
    isStateValid: boolean | null;
    isResultValid: boolean | null;
    _id: string;
}

export interface ITry {
    _id: string;
    bestResult: {} | null;
    bestResultHeadFrameId: string | null;
    headFrameId: string;
    framesTree: ITree<{ _id: string }>;
    name: string;
    timestamp: number;
}
