# Исходный код платформы конкурса "КИО"

Исходник сайта конкурса КИО. Является переработкой сайта [КИО](http://kio-nauka.ru).

## Оглавление

- [Полезные ссылки](#полезные-ссылки)
- [Установка и запуск](#установка-и-запуск)
- [Формулировка Задачи](#формулировка-задачи)
- [Разработка](#разработка)
  - [Выбранные инструменты и подходы](#выбранные-инструменты-и-подходы)
  - [Дизайн-проект](#дизайн-проект)
  - [Notion table](#notion-table)
- [Архитектура](#архитектура)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [style guide](#style-guide)
- [Добавление новых зависимостей](#добавление-новых-зависимостей)
- [Создатели](#cоздатели)

## Полезные ссылки

Установка [Docker](https://www.docker.com/)

Установка [Nodejs](https://nodejs.org/en)

## Установка и запуск

- Установите NodeJS >= 18.x.x версии
- Установите и запустите docker
- Прописать следующие комманды в bash для запуска **backend** части

```sh
cd ./kio_site/
npm install -g @microsoft/rush
./start.sh
```

Для запуска **frontend** части:

```sh
cd packages/frontend/
rushx start || npm start
```

## Формулировка Задачи

- Переписать существующую платформу КИО
- Заложение основ гибкой архитектуры проекта
- Разработать новый дизайн
- Добавить ряд возможностей в новую оболочку
  - Создание личного кабинета с расширенным функционалом
  - Создание платформы для конструирования задач
  - Создание графического интерфейса для добавления задач
  - Создание системы монетизации

## Разработка

### Выбранные инструменты и подходы

В рамках данного проекта мы будем использовать функциональный подход с декларативным стилем написания кода. Выбранный подход требует гораздо большего уровня знаний от программистов в сравнении с ООП подходом, поскольку человек редко в жизни сталкивается с функциональными вещами (в отличии от объектных), но при этом дает нам возможность сильно ускорить наш код и сделать его более лаконичным и простым.

В разработке будем использовать следующие технологии

- Frontend

Основным фреймворком выберем `React` + `React Query` для запросов. Также выберем `React Router` для роутинга на сайте и `typescript` в качестве языка программирования

- Backend

Будем использовать `express` и утилитарные для него библиотеки. Остальное возьмем из встроенных модулей в NodeJs

В качестве менеджера и сборщика будем использовать Rush + Vite

### Дизайн-проект

Для создания дизайн-макета мы консультировались с несколькими дизайнерами и как результат получили полноценный макет платформы в Figma. В основном мы хотели получить практичный, но при этом эффектный дизайн, который бы привлекал пользователей к участию в проекте.

[Посмотреть в figma](https://www.figma.com/file/l2QZZop4N5GKGqo9LFDma1/KIO-DESIGN?type=design&node-id=0%3A1&t=Qj9FyH6h9AFzRgz6-1)

### Notion table

Таблица в Notion с текущим распределением обязанностей на проекте

[Notion table](https://www.notion.so/3932769cf83843d3858e08da7397f1b4)

## Архитектура

Множество отдельных функций имеют документацию в файле к ним, тут только общие сведения об архитектуре

### backend

Архитектура backend части состоит из нескольких блоков

1. Это блок с `middleware` перед каждый запросом вы мутируем обьект запроса. проверяя токены и пользователя. После управление передается в обработчики
2. Обработчики в `express` на каждый конкретный маршрут выполняют некоторые действия, после отправляют ответ

Заметим, что вся структура проекта построена в строгую иерархию папок, все константы вынесены в соответствующие им папки и файлы в `domain`.
Описание схемы базы данных происходить в `/bd/`, там же происходит типизация данных, связанных в БД.

Папка `/api/` содержит контроллеры для каждого запроса, каждый контроллер состоит из типов, валидатора маршрута и самого контроллера.

Все внешние интерфейсы экспортируются в `index.ts` файле.

### frontend

Архитектура frontend части также разделена на части, только тут разделение строится на основе функциональности отдельных интерфейсов. Сам проект находится в `/src/` директории и разделен на функциональные блоки-компоненты.

1. `/api/` — Пакет для выполнения запросов. Для каждого маршрута создаем отдельный файл в `/routes/`. В нем пишем запрос, используя заранее написанную функцию `makeRequest()` и, в нем же, react-хук, использующий `react-query` для выполнения запроса в интерфейсе. Все внешние интерфейсы экспортируются в `index.ts` файле
2. `/components/` — Папка `share` компонентов, актуальные для сайта в целом, а не для конкретной страницы.
3. `/constants/` — Константы, которые используются по всему проекту
4. `/context/` — Контекст проекта, расшареный для каждого компонента. Редьюсеры в `/context/reducers` для `useReducer`
5. `/hooks/` — хуки общие для проекта. К примеру создание формы или добавление всплывающей подсказки.
6. `/pages/` — Каждая страница - отдельная папка, в ней `/services/` для компонентов, актуальных только для конкретной страницы. Каждая страница оборачивается в `<Layout>` для базовых настроек и запросов.
7. `/router/` — описание типа маршрут-страница. Обязательно через `lazy()` функцию
8. `/styles/` — в общем в проекте используется `css modules`, но тут конкретно общие стили
9. `/utils/` — утилитарные функции, которые используются для удобства. К примеру `clx` - `vue-like` условное преобразование классов.

## style guide

Именование папок и файлов происходит в `cebab-case`

Если не указано иное использовать [Google JS style guide](https://google.github.io/styleguide/jsguide.html)

## Добавление новых зависимостей

- Добавить новую запись в необходимый package.json вручную
- Выполнить команду `rush update`

Для этого надо находиться в **корне того пакета**, у которого вы хотите вызвать скрипт.

## Создатели:

[kyzinatra](https://github.com/kyzinatra)
[yandrinsky](https://github.com/yandrinsky)
[MichaelZhegalin](https://github.com/MichaelZhegalin)
