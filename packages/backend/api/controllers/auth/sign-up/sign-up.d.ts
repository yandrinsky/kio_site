import { ISuccessResponse } from '../../../../domain/types';
import { ERoles } from '../../../../bd';

export interface ISignUpDto {
    password: string;
    email: string;
    patronymic: string;
    name: string;
    surname: string;
    day: number;
    month: number;
    year: number;
    role: ERoles.User | ERoles.Creator | ERoles.Watcher;
}

export interface ISignUpResponse extends ISuccessResponse {}
