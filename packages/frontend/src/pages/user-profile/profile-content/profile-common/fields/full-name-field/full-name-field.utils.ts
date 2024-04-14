import { IGetValidationResult, IParseFullName } from './full-name-field';

export const getValidationResult: IGetValidationResult = value =>
  !value.surname ? 'Необходимо указать фамилию' : !value.name ? 'Необходимо указать имя' : true;

export const parseFullName: IParseFullName = fullName => {
  const parsedFullName = fullName.split(' ');

  return {
    surname: parsedFullName[0],
    name: parsedFullName[1],
    patronymic: parsedFullName[2]
  };
};
