import { FC, useState } from 'react';
import css from './user-upload-task-source-field.module.css';
import { IUserUploadTaskSourceField } from './user-upload-task-source-field';

export const UserUploadTaskSourceField: FC<IUserUploadTaskSourceField> = ({
  uploadTaskSource,
  taskId,
  isError,
  isLoading
}) => {
  const [isUploadTaskSource, setIsUploadTaskSource] = useState(false);

  return (
    <div className={css[`user-upload-task-source-field__container`]}>
      <div className={css[`user-upload-task-source-field__content`]}>
        <div>
          <div className={css['user-upload-task-source-field__header']}>
            <h3 className={css['user-upload-task-source-field__header--h3']}>Загрузка модуля</h3>
            <h5 className={css['user-upload-task-source-field__header--h5']}>
              Вы можете загрузить модуль для вашей задачи. Для этого нажмите на иконку загрузки
            </h5>
          </div>

          {isUploadTaskSource && (
            <div className={css['user-upload-task-source-field__main']}>
              <span className={css['user-upload-task-source-field__info-text']}>
                {isLoading
                  ? 'Идет загрузка модуля'
                  : isError
                  ? 'Во время загрузки модуля произошла ошибка!'
                  : 'Модуль загружен успешно'}
              </span>
            </div>
          )}
        </div>

        <div className={css['user-upload-task-source-field__img-container']}>
          <img
            className={css['user-upload-task-source-field__img']}
            src="/download.svg"
            alt="Иконка модуля"
          />
          <input
            className={css['user-upload-task-source-field__input-file']}
            onChange={e => {
              if (e.target.files) {
                uploadTaskSource({ taskId });
                setIsUploadTaskSource(true);
              }
            }}
            type="file"
            name="file"
            accept=".png, .jpeg, .jpg"
          />
        </div>
      </div>
    </div>
  );
};
