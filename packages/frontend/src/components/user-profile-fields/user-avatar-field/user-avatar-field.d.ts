import { IUserInitialField } from '../user-initial-field/user-initial-field';

export interface IUserAvatarField
  extends Pick<IUserInitialField, 'title' | 'subtitle' | 'footerText'> {
  mainText?: string;
  img?: string;
}
