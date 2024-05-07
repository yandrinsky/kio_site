import { useMeRequest } from '@api/index';
import { useSetDisplayNameMutation } from '@api/routes/set-display-name';
import { UserInputField } from '@components/user-profile-fields/user-input-field/user-input-field.component';
import React from 'react';
import { getValidationResult } from './nickname-field.utils';

export const NicknameField: React.FC = () => {
    const { data } = useMeRequest();
    const { mutate } = useSetDisplayNameMutation();

    return (
        <UserInputField
            title="Ваш никнейм"
            subtitle="Это ваше имя, которое будет отображаться публично"
            footerText="Пожалуйста, используйте не больше 32 символов"
            isEditable
            value={data?.displayName}
            validate={value => getValidationResult(value)}
            onSave={value => mutate({ displayName: value })}
        />
    );
};
