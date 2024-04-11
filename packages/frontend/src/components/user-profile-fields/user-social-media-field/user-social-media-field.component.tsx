import { FC } from 'react';
import css from './user-social-media-field.module.css';
import { IUserSocialMediaField } from './user-social-media-field';
import { UserInitialField } from '../user-initial-field/user-initial-field.component';
import { SocialMediaCell } from './social-media-cell/social-media-cell.component';

export const UserSocialMediaField: FC<IUserSocialMediaField> = ({ title, footerText }) => {
  return (
    <UserInitialField title={title} footerText={footerText}>
      <div className={css[`user-social-media__container`]}>
        <SocialMediaCell title={'GitHub'} imageSrc={'../../../../public/networks/github-logo.png'} />
        <SocialMediaCell title={'Google'} imageSrc={'../../../../public/networks/google-logo.png'} />
        <SocialMediaCell title={'VK'} imageSrc={'../../../../public/networks/vk-logo.png'} />
      </div>
    </UserInitialField>
  );
};
