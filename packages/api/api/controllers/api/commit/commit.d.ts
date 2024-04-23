import { ISuccessResponse } from '../../../../domain/types';

export interface ICommitDto {
    taskId: string;
    tryId: string;
    parentId: string;
    state: {};
    result: {};
    comment?: string;
}

export interface ICommitResponse extends ISuccessResponse {}
