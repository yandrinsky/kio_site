import { IGetValidationResult, IParseFullName } from './full-name-field';

export const getValidationResult: IGetValidationResult = value =>
    !value.surname ? 'Необходимо указать фамилию' : !value.name ? 'Необходимо указать имя' : true;

export const parseFullName: IParseFullName = fullName => {
    const [surname, name, patronymic] = fullName.split(' ');

    return { surname, name, patronymic };
};
