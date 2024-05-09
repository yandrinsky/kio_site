import css from './service-start.module.css';
import { ROUTES } from '@constants/routes';
import { Link } from '@components/ui-kit/link/link.component';
import { useMeRequest } from '@api/index';

export const ServiceStart = () => {
    const { isError } = useMeRequest();

    return (
        <section className={css.start}>
            <p className={css.start__title}>Начни свой путь вместе с нами</p>
            <div className={css.start__links}>
                <Link className={css.start__link} to={ROUTES.TASKS_ROUTE} theme="accent" size="xxlong">
                    К задачам
                </Link>
                {!isError ? (
                    <Link className={css.start__link} to={ROUTES.PROFILE_ROUTE} theme="accent" size="xxlong">
                        К профилю
                    </Link>
                ) : (
                    <Link className={css.start__link} to={ROUTES.SIGN_UP_ROUTE} theme="accent" size="xxlong">
                        Зарегестироваться на конкурс
                    </Link>
                )}
            </div>
        </section>
    );
};
