import { FC } from 'react';
import css from './user-preview-task-field.module.css';
import { IUserPreviewTaskField } from './user-preview-task-field';

export const UserPreviewTaskField: FC<IUserPreviewTaskField> = ({
    title,
    subtitle,
    img,
    mainText,
    handleFileChange
}) => {
    return (
        <div className={css[`user-preview-task-field__container`]}>
            <div className={css[`user-preview-task-field__content`]}>
                <div>
                    <div className={css['user-preview-task-field__header']}>
                        <h3 className={css['user-preview-task-field__header--h3']}>{title}</h3>
                        {subtitle && (
                            <h5 className={css['user-preview-task-field__header--h5']}>{subtitle}</h5>
                        )}
                    </div>

                    {mainText && (
                        <div className={css['user-preview-task-field__main']}>
                            <span className={css['user-preview-task-field__info-text']}>{mainText}</span>
                        </div>
                    )}
                </div>

                {img ? (
                    <div className={css['user-preview-task-field__img-container']}>
                        <img className={css['user-preview-task-field__img']} src={img} alt="иконка задачи" />
                        <input
                            className={css['user-preview-task-field__input-file']}
                            onChange={e => e.target.files && handleFileChange(e)}
                            type="file"
                            name="file"
                            accept=".png, .jpeg, .jpg"
                        />
                    </div>
                ) : (
                    <div className={css['user-preview-task-field__add-img-container']}>
                        <span className={css['user-preview-task-field__header--h4']}>
                            Добавить иконку задачи
                        </span>
                        <input
                            className={css['user-preview-task-field__input-file']}
                            onChange={e => e.target.files && handleFileChange(e)}
                            type="file"
                            name="file"
                            accept=".png, .jpeg, .jpg"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};
