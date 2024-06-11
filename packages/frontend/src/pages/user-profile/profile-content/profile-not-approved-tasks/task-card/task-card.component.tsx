import React, { useEffect, useState } from 'react';
import css from './task-card.module.css';
import { Button } from '@components/ui-kit/button/button.component';
import { ITaskCard } from './task-card';
import { useGetCreatedTasksListRequest } from '@api/routes/get-created-tasks-list';
import { useApproveTaskMutation } from '@api/routes/approve-task';
import { BASE_HOSTNAME, BASE_URL } from '@api/constants/base';
import { ApproveTaskModal } from '../approve-task-modal/approve-task-modal-modal.component';
import { useStartTaskMutation } from '@api/routes/start-task';

export const TaskCard: React.FC<ITaskCard> = ({ taskId, setIsOpen }) => {
    const { data: taskList } = useGetCreatedTasksListRequest();
    const task = taskList?.filter(task => task.id === taskId)[0];

    const { mutate } = useApproveTaskMutation();
    const { mutate: mutateStartTask, data } = useStartTaskMutation();

    const [isModalOpen, setIsModalOpen] = useState(false);

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
                                <Button
                                    theme="accent"
                                    onClick={() => mutateStartTask({ taskId: task?.id ?? '' })}
                                >
                                    Начать
                                </Button>
                                <Button onClick={() => setIsModalOpen(true)}>Утвердить</Button>
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

            <ApproveTaskModal
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                taskId={taskId}
                approveTaskMutation={mutate}
                setIsCardOpen={setIsOpen}
            />

            <div className={css['task-card__hidden']} onClick={() => setIsOpen(false)} />
        </>
    );
};
