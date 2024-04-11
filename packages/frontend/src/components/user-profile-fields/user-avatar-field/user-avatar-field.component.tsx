import { FC } from 'react';
import css from './user-avatar-field.module.css';
import { IUserAvatarField } from './user-avatar-field';

export const UserAvatarField: FC<IUserAvatarField> = ({ title, subtitle, footerText, img, mainText }) => {
  return (
    <div className={css[`user-avatar-field__container`]}>
      <div className={css[`user-avatar-field__content`]}>
        <div>
          <div className={css['user-avatar-field__header']}>
            <h3 className={css['user-avatar-field__header--h3']}>{title}</h3>
            {subtitle && <h5 className={css['user-avatar-field__header--h5']}>{subtitle}</h5>}
          </div>

          {mainText && (
            <div className={css['user-avatar-field__main']}>
              <span className={css['user-avatar-field__info-text']}>{mainText}</span>
            </div>
          )}
        </div>

        {img && (
          <div className={css['user-avatar-field__img-container']}>
            <img className={css['user-avatar-field__img']} src={img} alt="Аватар" />
          </div>
        )}
      </div>

      <div className={css['user-avatar-field__footer']}>
        <div>{footerText && <span className={css['user-avatar-field__footer-text']}>{footerText}</span>}</div>
      </div>
    </div>
  );
};
