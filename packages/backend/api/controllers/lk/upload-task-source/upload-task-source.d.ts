import { ISuccessResponse } from '../../../../domain/types';

export interface IUploadTaskSourceDTO {
    taskId: string;
    project: File;
}
export interface IUploadTaskSourceResponse extends ISuccessResponse {}
