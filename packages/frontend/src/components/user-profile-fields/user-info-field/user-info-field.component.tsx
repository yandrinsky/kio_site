import { FC } from 'react';
import css from './user-info-field.module.css';
import { IUserInfoField } from './user-info-field';
import { UserInitialField } from '../user-initial-field/user-initial-field.component';

export const UserInfoField: FC<IUserInfoField> = ({ title, subtitle, footerText, mainText }) => {
    return (
        <UserInitialField title={title} subtitle={subtitle} footerText={footerText}>
            <div className={css['user-info-field__info-text']}>{mainText}</div>
        </UserInitialField>
    );
};
