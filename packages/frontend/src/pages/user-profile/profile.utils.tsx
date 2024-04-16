import { ProfileCommon } from './profile-content/profile-common/profile-common.component';
import { ProfileSocialMedia } from './profile-content/profile-social-media/profile-social-media.component';
import { ProfilePayment } from './profile-content/profile-payment/profile-payment.component';
import { ProfileTasks } from './profile-content/profile-tasks/profile-tasks.component';
import { ProfileConstructors } from './profile-content/profile-constructors/profile-constructors.component';
import { ProfileNotificationsIntegrations } from './profile-content/profile-notifications-integrations/profile-notifications-integrations.component';
import { ProfileCreateTask } from './profile-content/profile-create-task/profile-create-task.component';

export const items = [
  'Общие',
  'Социальные сети',
  'Оплата',
  'Задачи',
  'Создать задачу',
  'Конструкторы',
  'Уведомления и интеграции'
];

export const UserProfileTabs = [
  { name: 'Общие', children: <ProfileCommon /> },
  { name: 'Социальные сети', children: <ProfileSocialMedia /> },
  { name: 'Оплата', children: <ProfilePayment /> },
  { name: 'Задачи', children: <ProfileTasks /> },
  { name: 'Создать задачу', children: <ProfileCreateTask /> },
  { name: 'Конструкторы', children: <ProfileConstructors /> },
  { name: 'Уведомления и интеграции', children: <ProfileNotificationsIntegrations /> }
];
