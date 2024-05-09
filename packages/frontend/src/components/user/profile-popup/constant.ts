import { ROUTES } from '@constants/routes';

export const PROFILE_CONTENT = [
    {
        path: ROUTES.PROFILE_ROUTE,
        title: 'Настройки'
    },
    {
        path: '/profile?profileTab=Задачи',
        title: 'Задачи'
    }
] as const;
