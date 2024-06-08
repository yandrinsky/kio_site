import { Modal } from '@components/ui-kit/modal/modal.component';
import React from 'react';
import css from './creating-task-modal.module.css';
import { Button } from '@components/ui-kit/button/button.component';
import { ICreatingTaskModal } from './creating-task-modal';

export const CreatingTaskModal: React.FC<ICreatingTaskModal> = ({
    isOpen,
    setIsOpen,
    userRole,
    updateTask,
    taskId
}) => {
    const title = userRole === 'Admin' ? 'Вы уверены?' : 'Действие невозможно';
    const subTitle =
        userRole === 'Admin'
            ? 'Данная задача уже была утверждена, без крайней необходимости не редактируйте ее'
            : 'Вы не можете редактировать утвержденную задачу';

    return (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <div className={css['modal-children']}>
                <div className={css['modal-children-text']}>
                    <h3 className={css['header--h3']}>{title}</h3>
                    <span className={css['info-text']}>{subTitle}</span>
                </div>

                {userRole === 'Admin' ? (
                    <div className={css['buttons-container']}>
                        <Button theme="colored-red" onClick={() => setIsOpen(false)}>
                            Отмена
                        </Button>

                        <Button theme="accent" onClick={() => updateTask(taskId)}>
                            Редактировать
                        </Button>
                    </div>
                ) : (
                    <div className={css['button-wrapper']}>
                        <Button theme="colored-red" onClick={() => setIsOpen(false)}>
                            Закрыть
                        </Button>
                    </div>
                )}
            </div>
        </Modal>
    );
};
