import { ERoles } from '../../../../../../backend/bd';

export const SELECT_OPTIONS = [
    {
        title: 'Участник',
        content: 'Я буду участвовать в конкурсе. Ученик школы, гимназии или лицея.',
        id: 'User'
    },
    {
        title: 'Создатель',
        content: 'Я хочу создать модуль для проведения конкурса.',
        id: 'Creator'
    },
    {
        title: 'Наблюдатель',
        content: 'Я учитель или другое заинтересованное лицо.',
        id: 'Watcher'
    }
];
