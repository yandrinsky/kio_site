import React, { useEffect } from 'react';
import css from './task-card.module.css';
import { Button } from '@components/ui-kit/button/button.component';
import { ITaskCard } from './task-card';
import { useGetCreatedTasksListRequest } from '@api/routes/get-created-tasks-list';
import { BASE_HOSTNAME, BASE_URL } from '@api/constants/base';
import { useStartTaskMutation } from '@api/routes/start-task';

export const TaskCard: React.FC<ITaskCard> = ({ taskId, setIsOpen }) => {
    const { data: taskList } = useGetCreatedTasksListRequest();
    const { mutateAsync } = useStartTaskMutation();

    const task = taskList?.filter(task => task.id === taskId)[0];

    return (
        <>
            <div onClick={e => e.stopPropagation()} className={css['task-card']}>
                <div className={css['container']}>
                    <div className={css['header']}>{task?.name}</div>

                    <div className={css['content']}>
                        {task?.preview ? (
                            <div className={css['img-container']}>
                                <img className={css['img']} src={BASE_URL + '/' + task.preview} alt="" />
                            </div>
                        ) : (
                            <div className={css['without-img-container']}>
                                <span>У этой задачи нет иконки</span>
                            </div>
                        )}

                        <div className={css['buttons-container']}>
                            <div className={css['buttons']}>
                                <Button
                                    theme="accent"
                                    onClick={async () => {
                                        const data = await mutateAsync({ taskId: task?.id ?? '' });
                                        window.location.href =
                                            BASE_HOSTNAME + ':' + data?.url + '?token=' + data?.token;
                                    }}
                                >
                                    Начать
                                </Button>
                                <Button theme="colored-red" onClick={() => setIsOpen(false)}>
                                    Закрыть
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className={css['description-container']}>
                        <div className={css['header--h4']}>Описание</div>
                        <div>{task?.description}</div>
                    </div>
                </div>
            </div>
            <div className={css['hidden']} onClick={() => setIsOpen(false)} />
        </>
    );
};
