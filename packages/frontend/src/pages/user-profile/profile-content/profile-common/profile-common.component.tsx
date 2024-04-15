import { UserInputField } from '@components/user-profile-fields/user-input-field/user-input-field.component';
import css from './profile-common.module.css';
import { UserInfoField } from '@components/user-profile-fields/user-info-field/user-info-field.component';
import { UserDeleteField } from '@components/user-profile-fields/user-delete-field/user-delete-field.component';
import { useMeRequest } from '@api/routes/me';
import { AvatarField } from './fields/avatar-field/avatar-field.component';

export const ProfileCommon = () => {
  const { data } = useMeRequest();

  return (
    <div className={css['profile-common__forms']}>
      <UserInputField
        title="Ваше имя"
        subtitle="Это ваше имя, которое будет отображаться публично"
        footerText="Пожалуйста, используйте не больше 32 символов"
        value={data?.name}
        validate={data => (data?.length < 2 ? 'Имя должно быть больше 1 символа' : true)}
        onSave={data => console.log('onSave', data)}
      />
      <UserInputField
        title="Ваш email адрес"
        subtitle="Это ваш email, с помощью которого вы входите в kio"
        footerText="Мы отправим письмо на эту почту для проверки"
        value={data?.email}
        onSave={data => console.log('onSave', data)}
      />
      <AvatarField />
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
