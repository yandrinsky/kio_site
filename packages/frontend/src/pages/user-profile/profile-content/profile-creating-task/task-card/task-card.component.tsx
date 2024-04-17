import React from 'react';
import css from './task-card.module.css';
import { Button } from '@components/ui-kit/button/button.component';
import { ITaskCard } from './task-card';

export const TaskCard: React.FC<ITaskCard> = ({ taskId, updateTask, setIsOpen }) => {
  const img = '';

  return (
    <>
      <div onClick={e => e.stopPropagation()} className={css['task-card']}>
        <div className={css['task-card__container']}>
          <div className={css['task-card__header']}>Заголовок</div>

          <div className={css['task-card__content']}>
            {img ? (
              <div className={css['task-card__img-container']}>
                <img className={css['task-card__img']} src="" alt="" />
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
            <div>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam deserunt pariatur dicta ullam
              molestiae corrupti autem blanditiis aspernatur libero voluptatem, adipisci saepe consectetur vel
              praesentium ut, tempore soluta possimus nihil! Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Ex eos libero aperiam fugiat molestiae minima nulla aspernatur hic incidunt
              quia? Earum odit doloremque totam veniam explicabo fugit labore nesciunt autem?
            </div>
          </div>
        </div>
      </div>
      <div className={css['task-card__hidden']} onClick={() => setIsOpen(false)} />
    </>
  );
};
