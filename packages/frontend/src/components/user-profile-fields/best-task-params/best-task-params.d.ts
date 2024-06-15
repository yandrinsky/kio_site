import { IUserInitialField } from '../user-initial-field/user-initial-field';

export type IBestTaskParams = Pick<IUserInitialField, 'title' | 'subtitle' | 'footerText'> & {
  value?: IRateTaskParams[];
  onSave?: (data: IRateTaskParams[]) => void;
};

export type IRateTaskParams = {
  name: undefined | string,
  rate: undefined | number,
  equalItem?: string | number,
  comparisonMethod: undefined | string
  isSave?: boolean;
}
