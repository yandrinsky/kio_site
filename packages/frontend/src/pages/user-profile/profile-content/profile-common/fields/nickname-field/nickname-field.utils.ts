import { IGetValidationResult } from './nickname-field';

export const getValidationResult: IGetValidationResult = value =>
  value?.length < 2
    ? 'Никнейм должен быть больше 1 символа'
    : value?.length >= 32
    ? 'Никнейм должен быть не больше 32 символов'
    : true;
