import { ProfileCommon } from './profile-content/profile-common/profile-common.component';
import { ProfileSocialMedia } from './profile-content/profile-social-media/profile-social-media.component';
import { ProfilePayment } from './profile-content/profile-payment/profile-payment.component';
import { ProfileTasks } from './profile-content/profile-tasks/profile-tasks.component';
import { ProfileConstructors } from './profile-content/profile-constructors/profile-constructors.component';
import { ProfileNotificationsIntegrations } from './profile-content/profile-notifications-integrations/profile-notifications-integrations.component';
import { ProfileCreatingTask } from './profile-content/profile-creating-task/profile-create-task.component';
import { ProfileNotApprovedTasks } from './profile-content/profile-not-approved-tasks/profile-not-approved-tasks.component';
import { ProfileChangeUserRole } from './profile-content/profile-change-user-role/profile-change-user-role.component';

export const userNavbarItems = [
  'Общие',
  'Социальные сети',
  'Оплата',
  'Задачи',
  'Создание задачи',
  'Конструкторы',
  'Уведомления и интеграции'
];

export const userProfileTabs = [
  { name: 'Общие', children: <ProfileCommon /> },
  { name: 'Социальные сети', children: <ProfileSocialMedia /> },
  { name: 'Оплата', children: <ProfilePayment /> },
  { name: 'Задачи', children: <ProfileTasks /> },
  { name: 'Создание задачи', children: <ProfileCreatingTask /> },
  { name: 'Конструкторы', children: <ProfileConstructors /> },
  { name: 'Уведомления и интеграции', children: <ProfileNotificationsIntegrations /> }
];

export const adminNavbarItems = [
  'Общие',
  'Социальные сети',
  'Оплата',
  'Задачи',
  'Создание задачи',
  'Неподтвержденные задачи',
  'Изменение роли пользователей',
  'Конструкторы',
  'Уведомления и интеграции'
];

export const adminProfileTabs = [
  { name: 'Общие', children: <ProfileCommon /> },
  { name: 'Социальные сети', children: <ProfileSocialMedia /> },
  { name: 'Оплата', children: <ProfilePayment /> },
  { name: 'Задачи', children: <ProfileTasks /> },
  { name: 'Создание задачи', children: <ProfileCreatingTask /> },
  { name: 'Неподтвержденные задачи', children: <ProfileNotApprovedTasks /> },
  { name: 'Изменение роли пользователей', children: <ProfileChangeUserRole /> },
  { name: 'Конструкторы', children: <ProfileConstructors /> },
  { name: 'Уведомления и интеграции', children: <ProfileNotificationsIntegrations /> }
];
