import css from './results-header.module.css';

export const ResultsHeader = () => {
    return (
        <div className={css['results-header__container']}>
            <h1 className={css['results-header__text']}>Лучшие результаты пользователей</h1>
        </div>
    );
};
