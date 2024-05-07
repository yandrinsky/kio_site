import React, { useState } from 'react';
import { useGetTasksListRequest } from '@api/routes/get-tasks-list';
import { Layout } from '@components/layout/layout.component';
import css from './tasks.module.css';
import { TaskCard } from './task-card/task-card.component';
import { Button } from '@components/ui-kit/button/button.component';
import { BASE_URL } from '@api/constants/base';
import { useMeRequest } from '@api/routes/me';
import { clx } from '@utils/clx';

export const Tasks: React.FC = () => {
    const { data: taskList } = useGetTasksListRequest();

    const [isOpen, setIsOpen] = useState(false);
    const [taskId, setTaskId] = useState<string>();
    const { data: meData } = useMeRequest();

    return (
        <Layout withNav>
            <div className={css['page']}>
                {isOpen && <TaskCard taskId={taskId ?? ''} setIsOpen={setIsOpen} />}
                {taskList?.length ? (
                    <div className={css['task-list']}>
                        {taskList.map(task => (
                            <div
                                key={task.id}
                                className={clx(css.container, !task.isAvailable && css['not-available'])}
                            >
                                <div className={css['content']}>
                                    <div>
                                        <div className={css['header']}>{task.name}</div>
                                        {!task.isAvailable && <div>Задача недоступна</div>}
                                        {!task.isAvailable && meData?.role === 'Admin' && (
                                            <div>(Но так как вы Администратор, то вам доступна)</div>
                                        )}
                                        <div className={css['button-wrapper']}>
                                            <Button
                                                theme="accent"
                                                onClick={() => {
                                                    setIsOpen(true);
                                                    setTaskId(task.id);
                                                }}
                                                disabled={meData?.role !== 'Admin' && !task.isAvailable}
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
