import { IUserBD } from '../../../../bd';

export interface IMeResponse {
    displayName: IUserBD['displayName'];
    name: IUserBD['name'];
    surname: IUserBD['surname'];
    patronymic: IUserBD['patronymic'];
    role: IUserBD['claims']['role'];
    avatarUrl: IUserBD['avatarUrl'];
    email: IUserBD['email'];
    age: number;
    birthday: { day: number; month: number; year: number };
    id: string;
}
