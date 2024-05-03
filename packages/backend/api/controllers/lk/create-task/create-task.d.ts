import { ISuccessResponse } from '../../../../domain/types';

export interface ICreateTaskDTO {
    name: string;
    description: string;
    settings: object;
    preview: file;
}

export interface ICreateTaskResponse {
    taskId: string;
}
