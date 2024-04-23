import { ISuccessResponse } from '../../../../domain/types';

export interface ILoginDto {
    token: string;
}

export interface ILoginResponse extends ISuccessResponse {}
