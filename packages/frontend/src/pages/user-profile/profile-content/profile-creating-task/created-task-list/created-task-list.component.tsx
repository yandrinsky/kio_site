import React, { useState } from 'react';
import css from './created-task-list.module.css';
import { ICreatedTaskList } from './created-task-list';
import { Button } from '@components/ui-kit/button/button.component';
import { TaskCard } from '../task-card/task-card.component';
import { useGetCreatedTasksListRequest } from '@api/routes/get-created-tasks-list';
import { BASE_URL } from '@api/constants/base';
import { clx } from '@utils/clx';
import { CreatingTaskModal } from '../creating-task-modal/creating-task-modal.component';
import { useMeRequest } from '@api/index';

export const CreatedTaskList: React.FC<ICreatedTaskList> = ({ updateTask }) => {
    const { data: taskList } = useGetCreatedTasksListRequest();
    const { data } = useMeRequest();

    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskId, setTaskId] = useState<string>();

    return (
        <div className={css['created-task-list']}>
            {isOpen && (
                <TaskCard
                    taskId={taskId ?? ''}
                    setIsOpen={setIsOpen}
                    updateTask={updateTask}
                    userRole={data?.role}
                />
            )}
            {taskList?.length ? (
                taskList.map(task => (
                    <div key={task.id} className={css['created-task-list__container']}>
                        <div className={css['created-task-list__content']}>
                            <div>
                                <div className={css['created-task-list__header']}>{task.name}</div>

                                <div className={css['task-status-container']}>
                                    <span
                                        className={clx(
                                            task.isApproved
                                                ? css['task-status-container__item--green']
                                                : css['task-status-container__item--red'],
                                            css['created-task-list__header--h5']
                                        )}
                                    >
                                        {task.isApproved ? 'Задача утверждена' : 'Задача на рассмотрении'}
                                    </span>

                                    <span
                                        className={clx(
                                            task.isAvailable
                                                ? css['task-status-container__item--green']
                                                : css['task-status-container__item--red'],
                                            css['created-task-list__header--h5']
                                        )}
                                    >
                                        {task.isAvailable
                                            ? 'Задача доступна для решения'
                                            : 'Задача недоступна для решения'}
                                    </span>

                                    <span
                                        className={clx(
                                            task.url
                                                ? css['task-status-container__item--green']
                                                : css['task-status-container__item--red'],
                                            css['created-task-list__header--h5']
                                        )}
                                    >
                                        {task.url ? 'Задача запущена' : 'Задача не запущена'}
                                    </span>
                                </div>

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
                                    <Button
                                        onClick={() => {
                                            setTaskId(task.id);
                                            task.isApproved ? setIsModalOpen(true) : updateTask(task.id);
                                        }}
                                    >
                                        Редактировать
                                    </Button>
                                </div>
                            </div>

                            {task.preview ? (
                                <div className={css['created-task-list__img-container']}>
                                    <img
                                        className={css['created-task-list__img']}
                                        src={BASE_URL + '/' + task.preview}
                                        alt="иконка задачи"
                                    />
                                </div>
                            ) : (
                                <div className={css['created-task-list__without-img-container']}>
                                    <span className={css['created-task-list__header--h5']}>
                                        У этой задачи нет иконки
                                    </span>
                                </div>
                            )}
                        </div>

                        <CreatingTaskModal
                            isOpen={isModalOpen}
                            setIsOpen={setIsModalOpen}
                            userRole={data?.role}
                            updateTask={updateTask}
                            taskId={String(taskId)}
                        />
                    </div>
                ))
            ) : (
                <span className={css['created-task-list__no-task-header']}>Задач пока нет</span>
            )}
        </div>
    );
};
