import { useMeRequest } from '@api/index';
import React from 'react';
import { UserInfoField } from '@components/user-profile-fields/user-info-field/user-info-field.component';

export const EmailField: React.FC = () => {
    const { data } = useMeRequest();

    return (
        <UserInfoField
            title="Ваш email адрес"
            subtitle="Это ваш email, с помощью которого вы входите в kio"
            footerText="Используется для обратной связи с пользователем"
            mainText={data?.email}
        />
    );
};
