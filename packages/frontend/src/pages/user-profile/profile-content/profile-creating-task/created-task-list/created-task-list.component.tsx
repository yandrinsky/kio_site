import React, { useState } from 'react';
import css from './created-task-list.module.css';
import { ICreatedTaskList } from './created-task-list';
import { Button } from '@components/ui-kit/button/button.component';
import { TaskCard } from '../task-card/task-card.component';
import { useGetCreatedTasksListRequest } from '@api/routes/get-created-tasks-list';

export const CreatedTaskList: React.FC<ICreatedTaskList> = ({ updateTask }) => {
  const { data: taskList } = useGetCreatedTasksListRequest();

  const [isOpen, setIsOpen] = useState(false);
  const [taskId, setTaskId] = useState<string>();

  return (
    <div className={css['created-task-list']}>
      {isOpen && <TaskCard taskId={taskId ?? ''} setIsOpen={setIsOpen} updateTask={updateTask} />}
      {taskList?.map(task => (
        <div key={task.id} className={css['created-task-list__container']}>
          <div className={css['created-task-list__content']}>
            <div>
              <div className={css['created-task-list__header']}>{task.name}</div>
              <div className={css['created-task-list__buttons']}>
                <Button
                  theme="accent"
                  onClick={() => {
                    setIsOpen(true);
                    setTaskId(task.id);
                  }}
                >
                  Открыть
                </Button>
                <Button onClick={() => updateTask(task.id)}>Редактировать</Button>
              </div>
            </div>

            {task.preview ? (
              <div className={css['created-task-list__img-container']}>
                <img className={css['created-task-list__img']} src={task.preview} alt="иконка задачи" />
              </div>
            ) : (
              <div className={css['created-task-list__without-img-container']}>
                <span className={css['created-task-list__header--h5']}>У этой задачи нет иконки</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
