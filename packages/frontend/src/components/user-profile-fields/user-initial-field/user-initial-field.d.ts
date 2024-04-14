export interface IUserInitialField {
  title: string;
  subtitle?: string;
  footerText?: string;
  PropButton?: JSX.Element;
  isChangeableInfo?: boolean;
  setIsChangeableInfo?: React.Dispatch<React.SetStateAction<boolean>>;
  theme?: 'default' | 'red';
}
