import { Modal } from '@components/ui-kit/modal/modal.component';
import React from 'react';
import css from './approve-task-modal-modal.module.css';
import { Button } from '@components/ui-kit/button/button.component';
import { IApproveTaskModal } from './approve-task-modal-modal';

export const ApproveTaskModal: React.FC<IApproveTaskModal> = ({
    isOpen,
    setIsOpen,
    taskId,
    approveTaskMutation
}) => {
    return (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <div className={css['modal-children']}>
                <div className={css['modal-children-text']}>
                    <h3 className={css['header--h3']}>Утверждение задачи</h3>
                    <span className={css['info-text']}>Вы уверены, что хотите утвердить задачу?</span>
                </div>

                <div className={css['buttons-container']}>
                    <Button theme="colored-red" onClick={() => setIsOpen(false)}>
                        Отмена
                    </Button>

                    <Button
                        onClick={() => {
                            approveTaskMutation({ taskId });
                            setIsOpen(false);
                        }}
                        theme="accent"
                    >
                        Утвердить
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
