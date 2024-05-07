import { FC } from 'react';
import css from './user-social-media-information-board.module.css';
import { IUserSocialMediaInformationBoard } from './user-social-media-information-board';
import { UserInitialInformationBoard } from '../user-initial-information-board/user-initial-information-board.component';

export const UserSocialMediaInformationBoard: FC<IUserSocialMediaInformationBoard> = ({
    title,
    subtitle,
    iconSrc,
    statusIcon,
    link
}) => {
    return (
        <div>
            <UserInitialInformationBoard title={title} iconSrc={iconSrc}>
                <a href={link} target="_blank" className={css[`social-media-information-board__user-name`]}>
                    {subtitle}
                </a>
                <img className={css[`social-media-information-board__icon`]} src={statusIcon} />
            </UserInitialInformationBoard>
        </div>
    );
};
