import { IUserInitialField } from '../user-initial-field/user-initial-field';

export interface IUserInfoField extends Pick<IUserInitialField, 'title' | 'subtitle' | 'footerText'> {
  mainText?: string;
}
