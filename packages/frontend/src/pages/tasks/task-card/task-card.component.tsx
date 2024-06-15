import React, { useEffect } from 'react';
import css from './task-card.module.css';
import { Button } from '@components/ui-kit/button/button.component';
import { ITaskCard } from './task-card';
import { BASE_HOSTNAME, BASE_URL } from '@api/constants/base';
import { useStartTaskMutation } from '@api/routes/start-task';
import { useGetTasksListRequest } from '@api/routes/get-tasks-list';
import { useGetTasksMutation } from '@api/routes/get-task';

export const TaskCard: React.FC<ITaskCard> = ({ taskId, setIsOpen }) => {
    const { mutate, data } = useGetTasksMutation();
    const { mutateAsync } = useStartTaskMutation();

    useEffect(() => mutate({ taskId }), []);

    const task = data;

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
                                <Button>Статистика</Button>
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
