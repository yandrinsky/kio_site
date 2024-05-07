import { ERoles } from '../../../../bd';

export interface ISearchUserDto {
    search: string;
}

export type ISearchUserResponse = {
    name: string;
    surname: string;
    patronymic: string;
    id: string;
    email: string;
    avatarUrl: string;
    birthday: { day: number; month: number; year: number };
    role: ERoles
}[];
