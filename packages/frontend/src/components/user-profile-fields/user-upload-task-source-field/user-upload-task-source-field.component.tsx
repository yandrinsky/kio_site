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
    <div className={css['field__container']}>
      <div className={css['field__content']}>
        <div>
          <div className={css['field__header']}>
            <h3 className={css['field__header--h3']}>Загрузка модуля</h3>
            <h5 className={css['field__header--h5']}>
              Вы можете загрузить модуль для вашей задачи. Для этого нажмите на иконку загрузки
            </h5>
          </div>

          {isUploadTaskSource && (
            <div className={css['field__main']}>
              <span className={css['field__info-text']}>
                {isLoading
                  ? 'Идет загрузка модуля'
                  : isError
                  ? 'Во время загрузки модуля произошла ошибка!'
                  : 'Модуль загружен успешно'}
              </span>
            </div>
          )}
        </div>

        <div className={css['field__img-container']}>
          <img className={css['field__img']} src="/download.svg" alt="Иконка модуля" />
          <input
            className={css['field__input-file']}
            onChange={e => {
              if (e.target.files) {
                uploadTaskSource({ taskId, project: e.target.files[0] });
                setIsUploadTaskSource(true);

                e.target.value = '';
              }
            }}
            type="file"
            name="file"
            accept=".zip, .rar"
          />
        </div>
      </div>
    </div>
  );
};
