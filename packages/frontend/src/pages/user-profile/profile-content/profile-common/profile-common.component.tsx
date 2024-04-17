import css from './profile-common.module.css';
import { UserAvatarField } from '@components/user-profile-fields/user-avatar-field/user-avatar-field.component';
import { UserInfoField } from '@components/user-profile-fields/user-info-field/user-info-field.component';
import { UserDeleteField } from '@components/user-profile-fields/user-delete-field/user-delete-field.component';
import { useMeRequest } from '@api/routes/me';
import { BASE_URL } from '@api/constants/base';
import { NicknameField } from './fields/nickname-field/nickname-field.component';
import { FullNameField } from './fields/full-name-field/full-name-field.component';
import { EmailField } from './fields/email-field/email-field.component';

export const ProfileCommon = () => {
  const { data } = useMeRequest();

  return (
    <div className={css['profile-common__forms']}>
      <NicknameField />

      <FullNameField />

      <EmailField />

      <UserAvatarField
        title="Ваш аватар"
        subtitle="Это ваш аватар, который видят все"
        mainText="Нажмите на картинку, чтобы сменить аватар"
        footerText="Аватар - необязательная часть"
        img={data?.avatarUrl ? BASE_URL + '/' + data?.avatarUrl : '/default-avatar.svg'}
      />
      <UserInfoField
        title="Ваш уникальный ID"
        subtitle="Это ваш уникальный ID"
        footerText="Используется для верификации пользователя"
        mainText={data?.id}
      />
      <UserDeleteField title="Удалить мой аккаунт" />
    </div>
  );
};
