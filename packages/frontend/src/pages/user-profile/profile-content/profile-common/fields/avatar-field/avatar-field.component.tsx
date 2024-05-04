import React from 'react';
import { BASE_URL } from '@api/constants/base';
import { useMeRequest } from '@api/index';
import { UserAvatarField } from '@components/user-profile-fields/user-avatar-field/user-avatar-field.component';

export const AvatarField: React.FC = () => {
  const { data } = useMeRequest();

  return (
    <UserAvatarField
      title="Ваш аватар"
      subtitle="Это ваш аватар, который видят все"
      mainText="Нажмите на картинку, чтобы сменить аватар"
      footerText="Аватар - необязательная часть"
      img={data?.avatarUrl ? BASE_URL + '/' + data?.avatarUrl : '/default-avatar.svg'}
    />
  );
};
