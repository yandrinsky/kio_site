import { HeaderContent } from '../profile-content-header/header-content.component';
import css from './profile-tasks.module.css';
import { useState } from 'react';
import { TaskCard } from './task-card/task-card.component';
import { Button } from '@components/ui-kit/button/button.component';
import { BASE_URL } from '@api/constants/base';
import { useGetMyTasksListRequest } from '@api/routes/get-my-tasks-list';

export const ProfileTasks = () => {
    const { data: taskList } = useGetMyTasksListRequest();

    const [isOpen, setIsOpen] = useState(false);
    const [taskId, setTaskId] = useState<string>();
    return (
        <div className={css['page']}>
            <HeaderContent title="Задачи" text="Тут отображаются незаконченные задачи." />
            {isOpen && <TaskCard taskId={taskId ?? ''} setIsOpen={setIsOpen} />}
            {taskList?.length ? (
                <div className={css['task-list']}>
                    {taskList.map(task => (
                        <div key={task.id} className={css['container']}>
                            <div className={css['content']}>
                                <div className={css['task-info']}>
                                    <div className={css['header']}>{task.name}</div>

                                    <div className={css['buttons']}>
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
                                    <div>
                                        <div className={css['img-container']}>
                                            <img
                                                className={css['img']}
                                                src={BASE_URL + '/' + task.preview}
                                                alt="иконка задачи"
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <div className={css['without-img-container']}>
                                            <span className={css['header--h5']}>
                                                У этой задачи нет иконки
                                            </span>
                                        </div>
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
    );
};
