import React from 'react';
import { UserInputField } from '@components/user-profile-fields/user-input-field/user-input-field.component';
import css from './update-task.module.css';
import { Button } from '@components/ui-kit/button/button.component';
import { UserPreviewTaskField } from '@components/user-profile-fields/user-preview-task-field/user-preview-task-field.component';
import { IUpdateTask } from './update-task';
import { UserTextareaField } from '@components/user-profile-fields/user-textarea-field/user-textarea-field.component';
import { UserUploadTaskSourceField } from '@components/user-profile-fields/user-upload-task-source-field/user-upload-task-source-field.component';
import { useUpdateTask } from './update-task.hook';
import { BASE_URL } from '@api/constants/base';
import { handleFileChange } from './update-task.utils';

export const UpdateTask: React.FC<IUpdateTask> = ({ updateTaskId, setUpdateTaskId }) => {
  const {
    updateTaskMutation,
    uploadTaskSourceMutation,
    isError,
    isLoading,
    taskName,
    setTaskName,
    description,
    setDescription,
    preview
  } = useUpdateTask(updateTaskId);

  return (
    <div className={css['update-task__wrapper']}>
      <UserInputField
        title="Название задачи"
        subtitle="Это название задачи, которое будут видеть пользователи"
        footerText="Пожалуйста, используйте не больше 32 символов"
        value={taskName}
        validate={data => (data?.length < 2 ? 'Имя должно быть больше 1 символа' : true)}
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
        validate={data => (data?.length < 1 ? 'Это поле обязательное для заполнения' : true)}
        onSave={data => {
          setDescription(description);
          updateTaskMutation({
            id: updateTaskId!,
            description: data
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

      <Button onClick={() => setUpdateTaskId(undefined)} theme="colored-red">
        Закончить редактирование
      </Button>
    </div>
  );
};
