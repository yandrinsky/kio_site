import { IUserInitialField } from '../user-initial-field/user-initial-field';

export type IUserTextareaField = Pick<IUserInitialField, 'title' | 'subtitle' | 'footerText'> & {
  value?: any;
  validate?: (data: string) => boolean | string;
  onSave?: (data: string) => void;
  onChangeInput?: (value: any) => void; 
};
