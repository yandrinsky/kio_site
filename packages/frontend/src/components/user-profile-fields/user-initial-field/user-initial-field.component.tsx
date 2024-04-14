import { PropsWithChildren, FC, useState } from 'react';
import css from './user-initial-field.module.css';
import { Button } from '@components/ui-kit/button/button.component';
import { clx } from '@utils/clx';
import { IUserInitialField } from './user-initial-field';

export const UserInitialField: FC<PropsWithChildren<IUserInitialField>> = ({
  title,
  subtitle,
  footerText,
  PropButton,
  children,
  isChangeableInfo,
  setIsChangeableInfo,
  theme = 'default'
}) => {
  const isChangeButton = isChangeableInfo === undefined ? false : isChangeableInfo;

  return (
    <div
      className={clx(css[`user-initial-field__container`], css[`user-initial-field__container--${theme}`])}
    >
      <div className={css['user-initial-field__header']}>
        <h3 className={css['user-initial-field__header--h3']}>{title}</h3>
        {subtitle && <h5 className={css['user-initial-field__header--h5']}>{subtitle}</h5>}
      </div>

      <div className={css['user-initial-field__main']}>{children}</div>

      {(footerText || PropButton) && (
        <div className={css['user-initial-field__footer']}>
          {isChangeButton ? (
            <div className={css['user-initial-field__button-container']}>
              <Button onClick={() => setIsChangeableInfo?.(state => !state)} theme="accent">
                Изменить
              </Button>
            </div>
          ) : (
            <>
              <div>
                {footerText && <span className={css['user-initial-field__footer-text']}>{footerText}</span>}
              </div>
              {PropButton}
            </>
          )}
        </div>
      )}
    </div>
  );
};
