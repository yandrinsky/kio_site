import { FC } from 'react';
import css from './user-delete-field.module.css';
import { IUserDeleteField } from './user-delete-field';
import { UserInitialField } from '../user-initial-field/user-initial-field.component';
import { Button } from '@components/ui-kit/button/button.component';

export const UserDeleteField: FC<IUserDeleteField> = ({ title }) => {
    const DeleteButton = <Button theme="colored-red">Удалить аккаунт</Button>;

    return (
        <UserInitialField title={title} Button={DeleteButton} theme="red">
            <span className={css['user-delete-field__delete-profile-text']}>
                Навсегда удалить Личный аккаунт и все его содержимое с платформы КИО. Это действие необратимо,
                поэтому, пожалуйста, продолжайте с осторожностью.
            </span>
        </UserInitialField>
    );
};
