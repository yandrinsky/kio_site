import { ITree } from '../../../../domain/types';
import { IFrame } from '../../../../bd';

export interface IGetCurrentSolutionResponse {
    tries: { name: string; _id: string }[];
    currentTryId: string;
    framesTree: ITree<{ _id: string }>;
    headFrameId: string;
    frame: IFrame;
    bestResult: object;
    bestTryId: string;
    bestHeadFrameId: string;
    id: string;
}
