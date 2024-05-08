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
                text="Здесь администратор может изменить роли пользователей."
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
                        <div key={user.id} className={css['container']}>
                            <div className={css['content']}>
                                <div>
                                    <div className={css['header']}>
                                        <span>
                                            {user.surname} {user.name} {user.patronymic}
                                        </span>
                                    </div>

                                    <div className={css['user-info-container']}>
                                        <span className={css['header--h5']}>
                                            Электронная почта: {user.email}
                                        </span>

                                        <span className={css['header--h5']}>
                                            Дата рождения: {String(user.birthday.day).padStart(2, '0')}.
                                            {String(user.birthday.month).padStart(2, '0')}.
                                            {user.birthday.year}
                                        </span>

                                        <span className={clx(css['header--h5'], css['select-container'])}>
                                            Роль:
                                            <Select
                                                value={role?.[index] ?? ''}
                                                disabled={user.id === data?.id}
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

                                    <div className={css['buttons']}>
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

                                <div className={css['img-container']}>
                                    <img
                                        className={css['img']}
                                        src={
                                            user.avatarUrl
                                                ? BASE_URL + '/' + user.avatarUrl
                                                : '/default-avatar.svg'
                                        }
                                        alt="иконка задачи"
                                    />
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <span className={css['no-task-header']}>Нет найденных пользователей</span>
                )}
            </div>
        </div>
    );
};
