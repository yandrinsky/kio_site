import { ISuccessResponse } from '../../../../domain/types';

export interface IDeleteTaskDTO {
    id: string;
}

export interface IDeleteTaskResponse extends ISuccessResponse {}
