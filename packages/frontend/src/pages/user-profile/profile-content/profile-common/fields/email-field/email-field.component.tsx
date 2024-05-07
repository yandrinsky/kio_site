import { useMeRequest } from '@api/index';
import { UserInputField } from '@components/user-profile-fields/user-input-field/user-input-field.component';
import React from 'react';
import { getValidationResult } from './email-field.utils';

export const EmailField: React.FC = () => {
    const { data } = useMeRequest();

    return (
        <UserInputField
            title="Ваш email адрес"
            subtitle="Это ваш email, с помощью которого вы входите в kio"
            footerText="Мы отправим письмо на эту почту для проверки"
            value={data?.email}
            validate={value => getValidationResult(value)}
            onSave={data => console.log('onSave', data)}
        />
    );
};
