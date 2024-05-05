import React, { useEffect, useState } from 'react';
import css from './profile-change-user-role.module.css';
import { HeaderContent } from '../profile-content-header/header-content.component';
import { UserInputField } from '@components/user-profile-fields/user-input-field/user-input-field.component';
import { useSearchUserMutation } from '@api/routes/search-user';
import { Button } from '@components/ui-kit/button/button.component';
import { BASE_URL } from '@api/constants/base';
import { Select } from '@components/ui-kit/select/select.component';
import { Option } from '@components/ui-kit/select/option/option.component';
import { clx } from '@utils/clx';
import { useChangeRoleMutation } from '@api/routes/change-role';
import { ERoles } from '../../../../../../backend/bd';
import { useMeRequest } from '@api/index';

export const ProfileChangeUserRole: React.FC = () => {
  const { data } = useMeRequest();
  const { mutate: searchUserMutation, data: userList } = useSearchUserMutation();
  const { mutate: changeRoleMutation } = useChangeRoleMutation();

  const [role, setRole] = useState<string[]>();

  useEffect(() => setRole(userList?.map(() => 'Admin')), [userList]);

  return (
    <div className={css.page}>
      <HeaderContent
        title="Измение роли пользователей"
        text={`
          Здесь администратор может изменить роли пользователей.
        `}
      />

      <UserInputField
        title="Найти пользователя"
        subtitle="Введите данные пользователя, чтобы найти его"
        buttonText="Искать"
        onSave={value => searchUserMutation({ search: value })}
      />
      <div className={css['user-list']}>
        {userList?.length ? (
          userList.map((user, index) => (
            <div key={user.id} className={css['user-list__container']}>
              <div className={css['user-list__content']}>
                <div>
                  <div className={css['user-list__header']}>
                    {`${user.surname} 
                    ${user.name} 
                    ${user.patronymic}`}
                  </div>

                  <div className={css['user-info-container']}>
                    <span className={css['user-list__header--h5']}>Электронная почта: {user.email}</span>

                    <span className={css['user-list__header--h5']}>
                      Дата рождения: {user.birthday.day}.{user.birthday.month}.{user.birthday.year}
                    </span>

                    <span className={clx(css['user-list__header--h5'], css['select-container'])}>
                      Роль:
                      <Select
                        value={role?.[index] ?? ''}
                        onChange={role => setRole(state => [...(state ?? []), role])}
                      >
                        <Option name="Admin">Администратор</Option>
                        <Option name="Creator">Создатель</Option>
                        <Option name="User">Пользователь</Option>
                        <Option name="Watcher">Наблюдатель</Option>
                        <Option name="Tester">Тестировщик</Option>
                      </Select>
                    </span>
                  </div>

                  <div className={css['user-list__buttons']}>
                    {user.id !== data?.id ? (
                      <Button
                        theme="accent"
                        onClick={() =>
                          changeRoleMutation({
                            role: role?.[index] as ERoles,
                            userId: user.id
                          })
                        }
                      >
                        Изменить роль
                      </Button>
                    ) : (
                      <Button disabled>Это вы</Button>
                    )}
                  </div>
                </div>

                {user.avatarUrl ? (
                  <div className={css['user-list__img-container']}>
                    <img
                      className={css['user-list__img']}
                      src={BASE_URL + '/' + user.avatarUrl}
                      alt="иконка задачи"
                    />
                  </div>
                ) : (
                  <div className={css['user-list__without-img-container']}>
                    <span className={css['user-list__header--h5']}>У этого пользователя нет иконки</span>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <span className={css['user-list__no-task-header']}>Нет найденных пользователей</span>
        )}
      </div>
    </div>
  );
};
