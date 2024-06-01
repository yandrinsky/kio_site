import { HeaderContent } from '../profile-content-header/header-content.component';
import css from './profile-not-approved-tasks.module.css';
import { Button } from '@components/ui-kit/button/button.component';
import { useState } from 'react';
import { useGetNotApprovedTacksListRequest } from '@api/routes/get-not-approved-tasks-list';
import { useApproveTaskMutation } from '@api/routes/approve-task';
import { TaskCard } from './task-card/task-card.component';
import { BASE_URL } from '@api/constants/base';
import { ApproveTaskModal } from './approve-task-modal/approve-task-modal-modal.component';
import { getPrettyDateFromTimestamp } from './profile-not-approved-tasks.utils';

export const ProfileNotApprovedTasks = () => {
    const { data: taskList } = useGetNotApprovedTacksListRequest();
    const { mutate } = useApproveTaskMutation();

    const [isCardOpen, setIsCardOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [approvedTaskId, setApprovedTaskId] = useState<string>();

    return (
        <div className={css['profile-not-approved-tasks']}>
            <HeaderContent
                title="Неподтвержденные задачи"
                text={`
          Здесь отображается список неподтвержденных задач.
        `}
            />

            <div className={css['task-list']}>
                {isCardOpen && <TaskCard taskId={approvedTaskId ?? ''} setIsOpen={setIsCardOpen} />}
                {taskList?.map(task => (
                    <div key={task.id} className={css['container']}>
                        <div className={css['content']}>
                            <div className={css['task-info']}>
                                <div>
                                    <div className={css['header']}>{task.name}</div>
                                    <div className={css['text']}>
                                        Автор:{' '}
                                        <span>
                                            {task.creator.surname} {task.creator.name}{' '}
                                            {task.creator.patronymic}
                                        </span>
                                        <div className={css['task-creator-avatar-container']}>
                                            <img
                                                className={css['task-creator-avatar']}
                                                src={
                                                    task.creator.avatar
                                                        ? BASE_URL + '/' + task.creator.avatar
                                                        : '/default-avatar.svg'
                                                }
                                                alt="иконка задачи"
                                            />
                                        </div>
                                    </div>
                                    <div className={css['text']}>Email: {task.creator.email}</div>
                                    <div className={css['text']}>
                                        Дата создания: {getPrettyDateFromTimestamp(task.createdDate)}
                                    </div>
                                </div>

                                <div className={css['buttons']}>
                                    <Button
                                        theme="accent"
                                        onClick={() => {
                                            setIsCardOpen(true);
                                            setApprovedTaskId(task.id);
                                        }}
                                    >
                                        Открыть
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            setIsModalOpen(true);
                                            setApprovedTaskId(task.id);
                                        }}
                                    >
                                        Утвердить
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
                                        <span className={css['header--h5']}>У этой задачи нет иконки</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <ApproveTaskModal
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                taskId={approvedTaskId!}
                approveTaskMutation={mutate}
            />
        </div>
    );
};
