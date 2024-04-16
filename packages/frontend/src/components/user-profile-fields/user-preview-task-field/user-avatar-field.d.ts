import { IUserInitialField } from '../user-initial-field/user-initial-field';

export interface IUserPreviewTaskField
  extends Pick<IUserInitialField, 'title' | 'subtitle' | 'footerText'> {
  mainText?: string;
  img?: string;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
