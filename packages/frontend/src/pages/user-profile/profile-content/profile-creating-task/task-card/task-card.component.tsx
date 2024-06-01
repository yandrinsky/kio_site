import React, { useEffect, useState } from 'react';
import css from './task-card.module.css';
import { Button } from '@components/ui-kit/button/button.component';
import { ITaskCard } from './task-card';
import { useGetCreatedTasksListRequest } from '@api/routes/get-created-tasks-list';
import { BASE_HOSTNAME, BASE_URL } from '@api/constants/base';
import { useStartTaskMutation } from '@api/routes/start-task';
import { CreatingTaskModal } from '../creating-task-modal/creating-task-modal.component';

export const TaskCard: React.FC<ITaskCard> = ({ taskId, updateTask, setIsOpen, userRole }) => {
    const { data: taskList } = useGetCreatedTasksListRequest();
    const { mutate, data } = useStartTaskMutation();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const task = taskList?.filter(task => task.id === taskId)[0];

    useEffect(() => {
        if (data?.url) {
            window.location.href = BASE_HOSTNAME + ':' + data?.url + '?token=' + data?.token;
        }
    }, [data?.url]);

    return (
        <>
            <div onClick={e => e.stopPropagation()} className={css['task-card']}>
                <div className={css['task-card__container']}>
                    <div className={css['task-card__header']}>{task?.name}</div>

                    <div className={css['task-card__content']}>
                        {task?.preview ? (
                            <div className={css['task-card__img-container']}>
                                <img
                                    className={css['task-card__img']}
                                    src={BASE_URL + '/' + task.preview}
                                    alt=""
                                />
                            </div>
                        ) : (
                            <div className={css['task-card__without-img-container']}>
                                <span>У этой задачи нет иконки</span>
                            </div>
                        )}

                        <div className={css['task-card__buttons-container']}>
                            <div className={css['task-card__buttons']}>
                                <Button theme="accent" onClick={() => mutate({ taskId: task?.id ?? '' })}>
                                    Начать
                                </Button>
                                <Button
                                    onClick={() => {
                                        task?.isApproved ? setIsModalOpen(true) : updateTask(taskId);
                                    }}
                                >
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

            <CreatingTaskModal
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                userRole={userRole}
                updateTask={updateTask}
                taskId={taskId}
            />

            <div className={css['task-card__hidden']} onClick={() => setIsOpen(false)} />
        </>
    );
};
