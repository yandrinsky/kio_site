import { IGetValidationResult } from './email-field';

export const getValidationResult: IGetValidationResult = value => {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return pattern.test(value) ? true : 'Введите корректный адрес электронной почты';
};
