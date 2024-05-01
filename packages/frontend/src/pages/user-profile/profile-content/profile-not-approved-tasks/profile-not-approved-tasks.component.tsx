import { HeaderContent } from '../profile-content-header/header-content.component';
import css from './profile-not-approved-tasks.module.css';
import { Button } from '@components/ui-kit/button/button.component';
import { useState } from 'react';
import { useGetNotApprovedTacksListRequest } from '@api/routes/get-not-approved-tasks-list';
import { useApproveTaskMutation } from '@api/routes/approve-task';
import { TaskCard } from './task-card/task-card.component';
import { BASE_URL } from '@api/constants/base';

export const ProfileNotApprovedTasks = () => {
  const { data: taskList } = useGetNotApprovedTacksListRequest();
  const { mutate } = useApproveTaskMutation();

  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState<string>();

  return (
    <div className={css['profile-not-approved-tasks']}>
      <HeaderContent
        title="Неподтвержденные задачи"
        text={`
          Здесь отображается список неподтвержденных задач.
        `}
      />
      <div className={css['profile-not-approved-tasks']}>
        {isOpen && <TaskCard taskId={state ?? ''} setIsOpen={setIsOpen} />}
        {taskList?.map(task => (
          <div key={task.id} className={css['profile-not-approved-tasks__container']}>
            <div className={css['profile-not-approved-tasks__content']}>
              <div>
                <div className={css['profile-not-approved-tasks__header']}>{task.name}</div>
                <div className={css['profile-not-approved-tasks__buttons']}>
                  <Button
                    theme="accent"
                    onClick={() => {
                      setIsOpen(true);
                      setState(task.id);
                    }}
                  >
                    Открыть
                  </Button>
                  <Button onClick={() => mutate({ taskId: task.id })}>Подтвердить</Button>
                </div>
              </div>

              {task.preview ? (
                <div className={css['profile-not-approved-tasks__img-container']}>
                  <img
                    className={css['profile-not-approved-tasks__img']}
                    src={BASE_URL + '/' + task.preview}
                    alt="иконка задачи"
                  />
                </div>
              ) : (
                <div className={css['profile-not-approved-tasks__without-img-container']}>
                  <span className={css['profile-not-approved-tasks__header--h5']}>
                    У этой задачи нет иконки
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
