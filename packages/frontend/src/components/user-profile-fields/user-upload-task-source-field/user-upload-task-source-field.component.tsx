import { FC, useState } from 'react';
import css from './user-upload-task-source-field.module.css';
import { IUserUploadTaskSourceField } from './user-upload-task-source-field';
import { Button } from '@components/ui-kit/button/button.component';

export const UserUploadTaskSourceField: FC<IUserUploadTaskSourceField> = ({
  uploadTaskSource,
  taskId,
  isError,
  isLoading
}) => {
  const [moduleArchive, setModuleArchive] = useState<File>();
  const [js1, setJs1] = useState<File>();
  const [js2, setJs2] = useState<File>();

  const [isUploadTaskSource, setIsUploadTaskSource] = useState(false);
  const isTasksSourceUploaded = Boolean(moduleArchive && js1 && js2);

  return (
    <div className={css['container']}>
      <div className={css['content']}>
        <div>
          <div className={css['header']}>
            <h3 className={css['header--h3']}>Загрузка модуля</h3>
            <h5 className={css['header--h5']}>
              Вы можете загрузить модуль для вашей задачи. Для этого нажмите на иконку загрузки
            </h5>
          </div>

          <div className={css['main']}>
            {isUploadTaskSource && (
              <span className={css['info-text']}>
                {isLoading
                  ? 'Идет загрузка файлов'
                  : isError
                  ? 'Во время загрузки файлов произошла ошибка!'
                  : 'Файлы загружены успешно'}
              </span>
            )}

            <div className={css['loader-container']}>
              <div className={css['loader-container__info']}>
                <img
                  className={css['loader-container__img']}
                  src={moduleArchive ? '/check-mark.svg' : '/cross.svg'}
                  alt="Иконка модуля"
                />
                <span>Загрузка архива модуля</span>
              </div>

              <div className={css['loader-container__img-container']}>
                <img className={css['loader-container__img']} src="/download.svg" alt="Иконка модуля" />
                <input
                  className={css['input-file']}
                  onChange={e => {
                    if (e.target.files) {
                      setModuleArchive(e.target.files[0]);

                      e.target.value = '';
                    }
                  }}
                  type="file"
                  name="file"
                  accept=".zip, .rar"
                />
              </div>
            </div>
            <div className={css['loader-container']}>
              <div className={css['loader-container__info']}>
                <img
                  className={css['loader-container__img']}
                  src={js1 ? '/check-mark.svg' : '/cross.svg'}
                  alt="Иконка модуля"
                />
                <span>Загрузка js файла 1</span>
              </div>

              <div className={css['loader-container__img-container']}>
                <img className={css['loader-container__img']} src="/download.svg" alt="Иконка модуля" />
                <input
                  className={css['input-file']}
                  onChange={e => {
                    if (e.target.files) {
                      setJs1(e.target.files[0]);

                      e.target.value = '';
                    }
                  }}
                  type="file"
                  name="file"
                  accept=".js"
                />
              </div>
            </div>
            <div className={css['loader-container']}>
              <div className={css['loader-container__info']}>
                <img
                  className={css['loader-container__img']}
                  src={js2 ? '/check-mark.svg' : '/cross.svg'}
                  alt="Иконка модуля"
                />
                <span>Загрузка js файла 2</span>
              </div>

              <div className={css['loader-container__img-container']}>
                <img className={css['loader-container__img']} src="/download.svg" alt="Иконка модуля" />
                <input
                  className={css['input-file']}
                  onChange={e => {
                    if (e.target.files) {
                      setJs2(e.target.files[0]);

                      e.target.value = '';
                    }
                  }}
                  type="file"
                  name="file"
                  accept=".js"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={css['user-initial-footer']}>
        <Button
          disabled={!isTasksSourceUploaded}
          theme="accent"
          onClick={() => {
            setIsUploadTaskSource(true);
            uploadTaskSource({ taskId, project: moduleArchive! });
          }}
        >
          Сохранить
        </Button>
      </div>
    </div>
  );
};
