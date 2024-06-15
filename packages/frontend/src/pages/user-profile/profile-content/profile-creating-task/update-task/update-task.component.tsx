import React from 'react';
import { UserInputField } from '@components/user-profile-fields/user-input-field/user-input-field.component';
import css from './update-task.module.css';
import { Button } from '@components/ui-kit/button/button.component';
import { UserPreviewTaskField } from '@components/user-profile-fields/user-preview-task-field/user-preview-task-field.component';
import { IRateTaskParams, ISortBestResultConfig, IUpdateTask } from './update-task';
import { UserTextareaField } from '@components/user-profile-fields/user-textarea-field/user-textarea-field.component';
import { UserUploadTaskSourceField } from '@components/user-profile-fields/user-upload-task-source-field/user-upload-task-source-field.component';
import { useUpdateTask } from './update-task.hook';
import { BASE_URL } from '@api/constants/base';
import {
    getValidationResult,
    handleFileChange,
    handleToggleChange,
    transformArray
} from './update-task.utils';
import { Toggle } from '@components/ui-kit/toggle/toggle.component';
import { UpdateTaskModal } from './update-task-modal/update-task-modal.component';
import { BestTaskParams } from '@components/user-profile-fields/best-task-params/best-task-params.component';

export const UpdateTask: React.FC<IUpdateTask> = ({ updateTaskId, setUpdateTaskId }) => {
    const {
        userRole,
        updateTaskMutation,
        deleteTaskMutation,
        uploadTaskSourceMutation,
        isError,
        isLoading,
        taskName,
        setTaskName,
        description,
        setDescription,
        isAvailable,
        setIsAvailable,
        isApproved,
        preview,
        settings,
        setSettings,
        isOpen,
        setIsOpen,
        rateTaskParams,
        setRateTaskParams
    } = useUpdateTask(updateTaskId);

    return (
        <div className={css['update-task__wrapper']}>
            <UserInputField
                title="Название задачи"
                subtitle="Это название задачи, которое будут видеть пользователи"
                footerText="Пожалуйста, используйте не больше 32 символов"
                value={taskName}
                validate={data => getValidationResult({ value: data, type: 'taskName' })}
                onSave={data => {
                    setTaskName(data);
                    updateTaskMutation({
                        id: updateTaskId!,
                        name: data
                    });
                }}
            />

            <UserTextareaField
                title="Описание задачи"
                subtitle="Опишите пользователям, о чем будет ваша задача"
                value={description}
                validate={data => getValidationResult({ value: data, type: 'description' })}
                onSave={data => {
                    setDescription(description);
                    updateTaskMutation({
                        id: updateTaskId!,
                        description: data
                    });
                }}
            />

            <BestTaskParams
                title="Оценка результата задачи"
                subtitle="Опишите как результаты задачи должны быть оценены"
                value={rateTaskParams}
                onSave={data => {
                    setRateTaskParams(data);
                    updateTaskMutation({
                        id: updateTaskId!,
                        settings: { ...JSON.parse(settings), sortBestResults: transformArray(data ?? []) }
                    });
                }}
            />

            <UserTextareaField
                title="Настройки задачи"
                subtitle="Введите настройки вашей задачи"
                value={settings}
                validate={data => getValidationResult({ value: data, type: 'settings' })}
                onSave={data => {
                    setSettings(settings);
                    updateTaskMutation({
                        id: updateTaskId!,
                        settings: JSON.parse(data)
                    });
                }}
            />

            <UserPreviewTaskField
                title="Иконка вашей задачи"
                subtitle="Иконку вашей задачи увидят другие пользователи"
                mainText="Нажмите на картинку, чтобы сменить иконку"
                img={preview ? BASE_URL + '/' + preview : preview}
                handleFileChange={event => handleFileChange({ event, updateTaskMutation, updateTaskId })}
            />

            <UserUploadTaskSourceField
                taskId={updateTaskId}
                uploadTaskSource={uploadTaskSourceMutation}
                isError={isError}
                isLoading={isLoading}
            />

            {userRole === 'Admin' && (
                <div className={css['available-task-container']}>
                    <h3 className={css['header--h3']}>Доступность задачи для прохождения</h3>

                    <Toggle
                        checked={isAvailable}
                        onChange={value => {
                            handleToggleChange({
                                isApproved: isApproved,
                                isAvailable: value,
                                setIsAvailable: setIsAvailable,
                                updateTaskId: updateTaskId,
                                updateTaskMutation
                            });
                        }}
                    />
                </div>
            )}

            <Button onClick={() => setUpdateTaskId(undefined)} theme="accent">
                Закончить редактирование
            </Button>

            <Button onClick={() => setIsOpen(true)} theme="colored-red">
                Удалить задачу
            </Button>

            <UpdateTaskModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                updateTaskId={updateTaskId}
                deleteTaskMutation={deleteTaskMutation}
                setUpdateTaskId={setUpdateTaskId}
            />
        </div>
    );
};
