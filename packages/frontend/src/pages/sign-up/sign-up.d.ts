import { ERoles } from '../../../../backend/bd';

export type TSignUpSelectForm = {
  role: ERoles.User | ERoles.Creator | ERoles.Watcher;
  email: string;
};

export type TSignUpDataForm = {
  password?: string;
  patronymic: string;
  name: string;
  surname: string;
  day: number;
  month: number;
  year: number;
};
