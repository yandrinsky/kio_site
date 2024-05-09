import { ProfileCommon } from './profile-content/profile-common/profile-common.component';
import { ProfileTasks } from './profile-content/profile-tasks/profile-tasks.component';
import { ProfileCreatingTask } from './profile-content/profile-creating-task/profile-create-task.component';
import { ProfileNotApprovedTasks } from './profile-content/profile-not-approved-tasks/profile-not-approved-tasks.component';
import { ProfileChangeUserRole } from './profile-content/profile-change-user-role/profile-change-user-role.component';

export const userNavbarItems = ['Общие', 'Задачи', 'Создание задачи'];

export const userProfileTabs = [
    { name: 'Общие', children: <ProfileCommon /> },
    { name: 'Задачи', children: <ProfileTasks /> },
    { name: 'Создание задачи', children: <ProfileCreatingTask /> }
];

export const adminNavbarItems = [
    'Общие',
    'Задачи',
    'Создание задачи',
    'Неподтвержденные задачи',
    'Изменение роли пользователей'
];

export const adminProfileTabs = [
    { name: 'Общие', children: <ProfileCommon /> },
    { name: 'Задачи', children: <ProfileTasks /> },
    { name: 'Создание задачи', children: <ProfileCreatingTask /> },
    { name: 'Неподтвержденные задачи', children: <ProfileNotApprovedTasks /> },
    { name: 'Изменение роли пользователей', children: <ProfileChangeUserRole /> }
];
