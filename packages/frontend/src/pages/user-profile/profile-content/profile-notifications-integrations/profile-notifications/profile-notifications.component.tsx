import { UserInformationBoard } from '@components/ui-kit/user-profile-information-board/user-data-information-board/user-information-board.component';
import css from './profile-notifications.module.css';

export const ProfileNotifications = () => {
    return (
        <div>
            <div className={css['profile-notifications__information-board-container']}>
                <UserInformationBoard
                    title="#### #### #### 3517"
                    iconSrc="/credit-card-regular.svg"
                    statusIcon="/ellipsis-vertical-solid.svg"
                />
                <UserInformationBoard
                    title="#### #### #### 2200"
                    iconSrc="/credit-card-regular.svg"
                    statusIcon="/ellipsis-vertical-solid.svg"
                />
            </div>
            <hr />
            <div className={css['profile-notifications__information-board-container']}>
                <UserInformationBoard
                    title="#### #### #### 3517"
                    iconSrc="/credit-card-regular.svg"
                    statusIcon="/ellipsis-vertical-solid.svg"
                />
                <UserInformationBoard
                    title="#### #### #### 2200"
                    iconSrc="/credit-card-regular.svg"
                    statusIcon="/ellipsis-vertical-solid.svg"
                />
            </div>
        </div>
    );
};
