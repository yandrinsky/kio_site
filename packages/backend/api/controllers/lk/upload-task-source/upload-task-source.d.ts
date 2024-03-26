import { ISuccessResponse } from '../../../../domain/types';

export interface IUploadTaskSourceDTO {
    id: string;
    taskSource: Buffer;
}
export interface IUploadTaskSourceResponse extends ISuccessResponse {}
