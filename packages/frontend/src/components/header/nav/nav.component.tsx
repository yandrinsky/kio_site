import { FC, useState, MouseEvent, memo, useRef } from 'react';

import css from './nav.module.css';

import { NAV_ROUTES } from './routes';
import { clx } from '@utils/clx';
import { IHoverStyle } from './nav';
import { ROUTES, routesData } from '../../../constants/routes';
import { Link } from '../../ui-kit/link/link.component';
import { Badge } from '../../ui-kit/badge/badge.component';
import { useMeRequest } from '@api/index';
import { Popup } from '@components/ui-kit/popup/popup.component';
import { ProfilePopup } from '@components/user/profile-popup/profile-popup.component';
import { BASE_URL } from '@api/constants/base';

export const Nav: FC = memo(() => {
    const [hoverStyle, setHoverStyle] = useState<IHoverStyle>();

    const { isError, isLoading, data } = useMeRequest();
    const isSignInDisplayed = isError || isLoading;

    function mouseEnterHandler(event: MouseEvent<HTMLElement>) {
        const element = event.target;
        if (!(element instanceof HTMLElement)) return;

        const childLink = (element.closest('li') as HTMLElement).childNodes[0] as HTMLAnchorElement;

        setHoverStyle({
            transform: `translateY(-50%) translateX(${childLink.offsetLeft - 5}px)`,
            width: childLink.clientWidth + 10 + 'px'
        });
    }
    function mouseLeaveHandler() {
        setHoverStyle(last => ({ ...last, opacity: 0 }));
    }

    const NavBadge: React.ReactNode = (
        <Badge
            src={data?.avatarUrl ? BASE_URL + '/' + data?.avatarUrl : '/default-avatar.svg'}
            width={25}
            height={25}
        />
    );

    return (
        <nav className={css.nav}>
            <ul className={css.nav__list}>
                <div className={css.nav__hover} style={hoverStyle}></div>
                {NAV_ROUTES.map(el => (
                    <li
                        className={css.nav__item}
                        onMouseEnter={mouseEnterHandler}
                        onMouseLeave={mouseLeaveHandler}
                        key={el.path}
                    >
                        <Link
                            className={({ isActive }) =>
                                clx(css.nav__link, { [css.nav__link_active]: isActive })
                            }
                            to={el.path}
                        >
                            {el.title}
                        </Link>
                    </li>
                ))}
            </ul>

            <div className={css.nav__sign}>
                {isSignInDisplayed ? (
                    <>
                        <Link to={ROUTES.SIGN_IN_ROUTE}>Войти</Link>
                        <Link to={ROUTES.SIGN_UP_ROUTE} theme="accent">
                            Регистрация
                        </Link>
                    </>
                ) : (
                    <Popup
                        nested
                        trigger={NavBadge}
                        arrow={false}
                        closeOnScroll
                        keepTooltipInside
                        position={'bottom left'}
                    >
                        <ProfilePopup />
                    </Popup>
                )}
            </div>
        </nav>
    );
});

Nav.displayName = 'memo(Nav)';
