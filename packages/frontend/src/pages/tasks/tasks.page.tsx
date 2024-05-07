import React, { useState } from 'react';
import { useGetTasksListRequest } from '@api/routes/get-tasks-list';
import { Layout } from '@components/layout/layout.component';
import css from './tasks.module.css';
import { TaskCard } from './task-card/task-card.component';
import { Button } from '@components/ui-kit/button/button.component';
import { BASE_URL } from '@api/constants/base';

export const Tasks: React.FC = () => {
    const { data: taskList } = useGetTasksListRequest();

    const [isOpen, setIsOpen] = useState(false);
    const [taskId, setTaskId] = useState<string>();

    return (
        <Layout withNav>
            <div className={css['page']}>
                {isOpen && <TaskCard taskId={taskId ?? ''} setIsOpen={setIsOpen} />}
                {taskList?.length ? (
                    <div className={css['task-list']}>
                        {taskList.map(task => (
                            <div key={task.id} className={css['container']}>
                                <div className={css['content']}>
                                    <div>
                                        <div className={css['header']}>{task.name}</div>
                                        <div className={css['button-wrapper']}>
                                            <Button
                                                theme="accent"
                                                onClick={() => {
                                                    setIsOpen(true);
                                                    setTaskId(task.id);
                                                }}
                                            >
                                                Открыть
                                            </Button>
                                        </div>
                                    </div>

                                    {task.preview ? (
                                        <div className={css['img-container']}>
                                            <img
                                                className={css['img']}
                                                src={BASE_URL + '/' + task.preview}
                                                alt="иконка задачи"
                                            />
                                        </div>
                                    ) : (
                                        <div className={css['without-img-container']}>
                                            <span className={css['header--h5']}>
                                                У этой задачи нет иконки
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <span className={css['no-task-header']}>Задач пока нет</span>
                )}
            </div>
        </Layout>
    );
};
