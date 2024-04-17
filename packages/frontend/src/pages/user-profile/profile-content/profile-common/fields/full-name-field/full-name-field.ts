export type IGetValidationResult = (props: {
  surname: string;
  name: string;
  patronymic: string;
}) => string | boolean;

export type IParseFullName = (value: string) => {
  surname: string;
  name: string;
  patronymic: string;
};
