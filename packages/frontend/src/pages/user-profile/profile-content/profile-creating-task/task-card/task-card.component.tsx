import React from 'react';
import css from './task-card.module.css';
import { Button } from '@components/ui-kit/button/button.component';
import { ITaskCard } from './task-card';
import { useGetCreatedTasksListRequest } from '@api/routes/get-created-tasks-list';

export const TaskCard: React.FC<ITaskCard> = ({ taskId, updateTask, setIsOpen }) => {
  const { data: taskList } = useGetCreatedTasksListRequest();
  const task = taskList?.filter(task => task.id === taskId)[0];

  return (
    <>
      <div onClick={e => e.stopPropagation()} className={css['task-card']}>
        <div className={css['task-card__container']}>
          <div className={css['task-card__header']}>{task?.name}</div>

          <div className={css['task-card__content']}>
            {task?.preview ? (
              <div className={css['task-card__img-container']}>
                <img className={css['task-card__img']} src={task.preview} alt="" />
              </div>
            ) : (
              <div className={css['task-card__without-img-container']}>
                <span>У этой задачи нет иконки</span>
              </div>
            )}

            <div className={css['task-card__buttons-container']}>
              <div className={css['task-card__buttons']}>
                <Button theme="accent" onClick={() => updateTask(taskId)}>
                  Редактировать
                </Button>
                <Button theme="colored-red" onClick={() => setIsOpen(false)}>
                  Закрыть
                </Button>
              </div>
            </div>
          </div>

          <div className={css['task-card__description-container']}>
            <div className={css['task-card__header--h4']}>Описание</div>
            <div>{task?.description}</div>
          </div>
        </div>
      </div>
      <div className={css['task-card__hidden']} onClick={() => setIsOpen(false)} />
    </>
  );
};
