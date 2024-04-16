export interface IUserInitialField {
  title: string;
  subtitle?: string;
  footerText?: string;
  Button?: JSX.Element;
  isChanging?: boolean;
  setIsChanging?: React.Dispatch<React.SetStateAction<boolean>>;
  theme?: 'default' | 'red';
}
