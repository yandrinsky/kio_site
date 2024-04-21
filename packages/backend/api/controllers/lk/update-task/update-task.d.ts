import { ISuccessResponse } from '../../../../domain/types';

export interface IUpdateTaskDTO {
    id: string;
    name: string;
    description: string;
    settings: object;
    isAvailable?: boolean;
}
export interface IUpdateTaskResponse extends ISuccessResponse {}
