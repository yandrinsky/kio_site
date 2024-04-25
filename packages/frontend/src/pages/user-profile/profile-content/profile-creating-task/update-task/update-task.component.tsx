import React from 'react';
import { UserInputField } from '@components/user-profile-fields/user-input-field/user-input-field.component';
import css from './create-task.module.css';
import { Button } from '@components/ui-kit/button/button.component';
import { useState } from 'react';
import { useCreateTaskMutation } from '@api/routes/create-task';
import { UserPreviewTaskField } from '@components/user-profile-fields/user-preview-task-field/user-preview-task-field.component';
import { ICreateTask } from './update-task';
import { useUpdateTaskMutation } from '@api/routes/update-task';
import { UserTextareaField } from '@components/user-profile-fields/user-textarea-field/user-textarea-field.component';
import { useUploadTaskSourceMutation } from '@api/routes/upload-task-source';
import { useGetCreatedTasksListRequest } from '@api/routes/get-created-tasks-list';
import { useMeRequest } from '@api/index';
import { UserUploadTaskSourceField } from '@components/user-profile-fields/user-upload-task-source-field/user-upload-task-source-field.component';
import { useCreateTask } from './update-task.hook';

export const CreateTask: React.FC<ICreateTask> = ({ updateTaskId, setUpdateTaskId }) => {
  const {
    createTaskMutation,
    isCreateTaskMutationError,
    isCreateTaskMutationLoading,
    updateTaskMutation,
    userData,
    updatedTask,
    isTaskCreated,
    setIsTaskCreated,
    createdTaskId,
    uploadTaskSourceMutation,
    isError,
    isLoading,
    taskName,
    setTaskName,
    description,
    setDescription,
    preview,
    setPreview
  } = useCreateTask(updateTaskId);

  const formData = new FormData();

  const isRequiredFieldsFilled = taskName !== '' && description !== '';
  const isUploadTaskSourceVisible =
    isTaskCreated && !isCreateTaskMutationError && !isCreateTaskMutationLoading;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    formData.append('preview', file);

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setPreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleOnSubmit = () => {
    if (updatedTask) {
      updateTaskMutation({
        id: updateTaskId!,
        name: taskName,
        description: description,
        isAvailable: userData?.role === 'Admin' ? updatedTask.isAvailable : undefined,
        settings: { test: 'test' }
      });

      setUpdateTaskId(undefined);
      setTaskName('');
      setDescription('');
      setPreview('');
      setIsTaskCreated(false);
    } else {
      createTaskMutation({
        name: taskName,
        description: description,
        settings: { test: 'test' },
        preview: formData
      });
      setIsTaskCreated(true);
    }
  };

  return (
    <div className={css['create-task__forms']}>
      <UserInputField
        title="Название задачи"
        subtitle="Это название задачи, которое будут видеть пользователи"
        footerText="Пожалуйста, используйте не больше 32 символов"
        value={taskName}
        validate={data => (data?.length < 2 ? 'Имя должно быть больше 1 символа' : true)}
        onSave={data => setTaskName(data)}
      />
      <UserTextareaField
        title="Описание задачи"
        subtitle="Опишите пользователям, о чем будет ваша задача"
        value={description}
        validate={data => (data?.length < 1 ? 'Это поле обязательное для заполнения' : true)}
        onSave={data => setDescription(data)}
      />
      <UserPreviewTaskField
        title="Иконка вашей задачи"
        subtitle="Иконку вашей задачи увидят другие пользователи"
        mainText="Нажмите на картинку, чтобы сменить иконку"
        img={preview}
        handleFileChange={handleFileChange}
      />

      {isUploadTaskSourceVisible && (
        <UserUploadTaskSourceField
          taskId={createdTaskId!}
          uploadTaskSource={uploadTaskSourceMutation}
          isError={isError}
          isLoading={isLoading}
        />
      )}

      <Button
        theme="colored-red"
        onClick={() => {
          setIsTaskCreated(false);
        }}
      >
        Отменить
      </Button>
    </div>
  );
};
