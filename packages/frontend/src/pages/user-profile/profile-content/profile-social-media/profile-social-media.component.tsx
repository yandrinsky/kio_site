import { UserSocialMediaInformationBoard } from '@components/ui-kit/user-profile-information-board/user-social-media-information-board/user-social-media-information-board.component';
import css from './profile-social-media.module.css';
import { HeaderContent } from '../profile-content-header/header-content.component';
import { UserSocialMediaField } from '@components/user-profile-fields/user-social-media-field/user-social-media-field.component';

export const ProfileSocialMedia = () => {
    return (
        <div className={css['profile-social-media__forms']}>
            <HeaderContent
                title="Социальные сети"
                text={`
          Свяжите свой Личный кабинет на KIO со сторонним сервисом, 
          чтобы исопльзовать его для входа. 
          Для каждой сторонней службы можно добавить одно соединение для входа.
        `}
            />
            <UserSocialMediaField title="Добавьте новые социальные сети" />
            <div className={css[`profile-social-media__information-board-container`]}>
                <UserSocialMediaInformationBoard
                    title="Github"
                    subtitle="@kuzinatra"
                    iconSrc="../../../../public/networks/github-logo.png"
                    statusIcon="/ellipsis-vertical-solid.svg"
                    link=""
                />
                <UserSocialMediaInformationBoard
                    title="Github"
                    subtitle="@kuzinatra"
                    iconSrc="../../../../public/networks/github-logo.png"
                    statusIcon="/ellipsis-vertical-solid.svg"
                    link=""
                />
                <UserSocialMediaInformationBoard
                    title="Github"
                    subtitle="@kuzinatra"
                    iconSrc="../../../../public/networks/github-logo.png"
                    statusIcon="/ellipsis-vertical-solid.svg"
                    link=""
                />
            </div>
        </div>
    );
};
