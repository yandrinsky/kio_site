import { UserInputField } from '@components/user-profile-fields/user-input-field/user-input-field.component';
import css from './profile-common.module.css';
import { UserAvatarField } from '@components/user-profile-fields/user-avatar-field/user-avatar-field.component';
import { UserInfoField } from '@components/user-profile-fields/user-info-field/user-info-field.component';
import { UserDeleteField } from '@components/user-profile-fields/user-delete-field/user-delete-field.component';
import { useMeRequest } from '@api/routes/me';
import { BASE_URL } from '@api/constants/base';
import { useSetDisplayNameMutation } from '@api/routes/set-display-name';

export const ProfileCommon = () => {
  const { data } = useMeRequest();
  const { mutate, isError, isLoading } = useSetDisplayNameMutation();

  return (
    <div className={css['profile-common__forms']}>
      <UserInputField
        title="Ваш никнейм"
        subtitle="Это ваше имя, которое будет отображаться публично"
        footerText="Пожалуйста, используйте не больше 32 символов"
        value={data?.displayName}
        validate={data => (data?.length < 2 ? 'Имя должно быть больше 1 символа' : true)}
        onSave={value => mutate({ displayName: value })}
      />
      <UserInputField
        title="Ваш email адрес"
        subtitle="Это ваш email, с помощью которого вы входите в kio"
        footerText="Мы отправим письмо на эту почту для проверки"
        value={data?.email}
        onSave={data => console.log('onSave', data)}
      />
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
