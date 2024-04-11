import { PropsWithChildren, FC } from 'react';
import css from './user-initial-field.module.css';
import { Button } from '@components/ui-kit/button/button.component';
import { clx } from '@utils/clx';
import { IUserInitialField } from './user-initial-field';

export const UserInitialField: FC<PropsWithChildren<IUserInitialField>> = ({
  title,
  subtitle,
  footerText,
  Button,
  children,
  theme = 'default'
}) => {
  return (
    <div
      className={clx(css[`user-initial-field__container`], css[`user-initial-field__container--${theme}`])}
    >
      <div className={css['user-initial-field__header']}>
        <h3 className={css['user-initial-field__header--h3']}>{title}</h3>
        {subtitle && <h5 className={css['user-initial-field__header--h5']}>{subtitle}</h5>}
      </div>

      <div className={css['user-initial-field__main']}>{children}</div>

      {(footerText || Button) && (
        <div className={css['user-initial-field__footer']}>
          <div>
            {footerText && <span className={css['user-initial-field__footer-text']}>{footerText}</span>}
          </div>

          {Button}
        </div>
      )}
    </div>
  );
};
