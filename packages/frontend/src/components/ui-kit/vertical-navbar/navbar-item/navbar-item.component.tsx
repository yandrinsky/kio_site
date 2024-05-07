import React from 'react';
import css from './navbar-item.module.css';
import { INavbarItem } from './navbar-item';
import { clx } from '@utils/clx';

export const NavbarItem: React.FC<INavbarItem> = ({ item, isActive, onClick }) => {
    return (
        <li className={css.navbar__item} onClick={() => onClick()}>
            <span className={css[`navbar__item-link__${isActive}`]}>{item}</span>
        </li>
    );
};
