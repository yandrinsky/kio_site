import { ISuccessResponse } from '../../../../domain/types';

export interface IUploadTaskSourceDTO {
    taskId: string;
    project: File;
    stateChecker: File;
    getResult: File;
}
export interface IUploadTaskSourceResponse extends ISuccessResponse {}
