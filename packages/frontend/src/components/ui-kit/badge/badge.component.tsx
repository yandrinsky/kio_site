import { PropsWithChildren, forwardRef, memo } from 'react';
import { IBadge } from './badge';

import css from './badge.module.css';
import { Link } from '../link/link.component';
import { clx } from '@utils/clx';
import { ICON_HEIGHT, ICON_WIDTH } from '@constants/sizes';

/**
 * @description Badge component for displaying badges
 */
export const Badge = memo(
  forwardRef<HTMLElement, PropsWithChildren<IBadge>>((props: PropsWithChildren<IBadge>, ref) => {
    const { children, src, to, height = ICON_HEIGHT, width = ICON_WIDTH, className, ...other } = props;
    const content = (
      <figure className={clx(css.badge, className)} ref={ref} tabIndex={0} {...other}>
        <figcaption>{children}</figcaption>
        <img src={src} width={width} height={height} />
      </figure>
    );
    return to ? <Link to={to}>{content}</Link> : content;
  })
);

Badge.displayName = 'Badge';
