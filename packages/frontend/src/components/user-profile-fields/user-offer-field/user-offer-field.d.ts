import { IUserInitialField } from '../user-initial-field/user-initial-field';

export type IUserOfferField = Pick<IUserInitialField, 'title' | 'subtitle' | 'footerText'>;
