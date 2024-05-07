import { ISuccessResponse } from '../../../../domain/types';

export interface IUploadTaskVerificationsDto {
    taskId: string;
}

export interface IUploadTaskVerificationsResponse extends ISuccessResponse {}
