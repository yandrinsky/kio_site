import { Modal } from '@components/ui-kit/modal/modal.component';
import React from 'react';
import css from './update-task-modal.module.css';
import { Button } from '@components/ui-kit/button/button.component';
import { IUpdateTaskModal } from './update-task-modal';

export const UpdateTaskModal: React.FC<IUpdateTaskModal> = ({
    isOpen,
    setIsOpen,
    deleteTaskMutation,
    updateTaskId,
    setUpdateTaskId
}) => {
    return (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <div className={css['modal-children']}>
                <div className={css['modal-children-text']}>
                    <h3 className={css['header--h3']}>Вы уверены?</h3>
                    <span className={css['info-text']}>Данное действие нельзя отменить!</span>
                </div>

                <div className={css['buttons-container']}>
                    <Button theme="accent" onClick={() => setIsOpen(false)}>
                        Отмена
                    </Button>

                    <Button
                        onClick={() => {
                            deleteTaskMutation({ taskId: updateTaskId });
                            setUpdateTaskId(undefined);
                        }}
                        theme="colored-red"
                    >
                        Удалить
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
