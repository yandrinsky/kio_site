import { ISuccessResponse } from '../../../../domain/types';

export interface ICommitDto {
    taskId: string;
    //TryId все еще нужно слать, не смотря на то, что он записан в БД и так, потому что можно решать на двух устройствах и если на одном поменять currentTryId, а другое устройство это изменение не загрузит, то получится путаница - отправлено на старый tryId, но на сервере уже новый
    tryId: string;
    parentId: string;
    state: {};
    result: {};
    comment?: string;
}

export interface ICommitResponse extends ISuccessResponse {}
