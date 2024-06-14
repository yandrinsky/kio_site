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
        title: 'Тестировщик',
        content: 'Я тестирую модули перед их публикацией.',
        id: 'Tester'
    }
];
