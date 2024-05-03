import { FC, useState } from 'react';

import css from './vertical-navbar.module.css';
import { IVerticalNavbar } from './vertical-navbar';
import { NavbarItem } from './navbar-item/navbar-item.component';
import { useQueryParams } from '../../../history/use-query/use-query-params';

export const VerticalNavbar: FC<IVerticalNavbar> = ({ items, setIsActive }) => {
  const [query, setParams] = useQueryParams();

  const [isActiveNavbarItem, setIsActiveNavbarItem] = useState(query.profileTab ?? 0);

  return (
    <div>
      <ul className={css.navbar}>
        {items.map((item: string, index: number) => (
          <NavbarItem
            onClick={() => {
              setIsActiveNavbarItem(item);
              setIsActive(item);
              setParams(query => ({ ...query, profileTab: item }));
            }}
            item={item}
            isActive={isActiveNavbarItem === item ? 'active' : 'default'}
            key={index}
          />
        ))}
      </ul>
    </div>
  );
};
