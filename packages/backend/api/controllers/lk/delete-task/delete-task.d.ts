import { ISuccessResponse } from '../../../../domain/types';

export interface IDeleteTaskDTO {
    taskId: string;
}

export interface IDeleteTaskResponse extends ISuccessResponse {}
