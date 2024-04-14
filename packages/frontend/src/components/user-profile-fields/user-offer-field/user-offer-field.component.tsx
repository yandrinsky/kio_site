import { FC } from 'react';
import { IUserOfferField } from './user-offer-field';
import { UserInitialField } from '../user-initial-field/user-initial-field.component';
import { Button } from '@components/ui-kit/button/button.component';

export const UserOfferField: FC<IUserOfferField> = ({ title, subtitle, footerText }) => {
  const UserOfferButton = <Button theme="accent">Добавить</Button>;

  return (
    <UserInitialField
      title={title}
      subtitle={subtitle}
      footerText={footerText}
      PropButton={UserOfferButton}
    />
  );
};
