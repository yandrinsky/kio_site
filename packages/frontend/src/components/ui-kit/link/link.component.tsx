import { FC, PropsWithChildren, memo, useCallback } from 'react';
import { ILink, TLinkClassNames } from './link';
import { NavLink } from 'react-router-dom';

import css from './link.module.css';
import { clx } from '@utils/clx';

/**
 * Link component for displaying links on the page. Takes all the props of the NavLink (react-router) element and the theme, size, underline props.
 *
 * DO NOT USE THE REACT ROUTER NAV LINK OR LINK COMPONENTS DIRECTLY, use this component instead
 */

export const Link: FC<PropsWithChildren<ILink>> = memo((props: PropsWithChildren<ILink>) => {
  const { theme = 'default', size = 'default', isAlert, className, children, ...other } = props;
  const classNameFn = useCallback(
    (attrs: TLinkClassNames) => {
      let dropClassNames = className;
      if (typeof className === 'function') dropClassNames = className(attrs);
      return clx(css[`link_size-${size}`], css[`link_${theme}`], isAlert && css.link_alert, dropClassNames);
    },
    [theme, className]
  );

  return (
    <NavLink className={classNameFn} {...other}>
      {children}
    </NavLink>
  );
});

Link.displayName = 'Link';
