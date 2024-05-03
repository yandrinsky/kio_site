import React, { useState } from 'react';
import { UserInputField } from '@components/user-profile-fields/user-input-field/user-input-field.component';
import css from './create-task.module.css';
import { Button } from '@components/ui-kit/button/button.component';
import { UserPreviewTaskField } from '@components/user-profile-fields/user-preview-task-field/user-preview-task-field.component';
import { UserTextareaField } from '@components/user-profile-fields/user-textarea-field/user-textarea-field.component';
import { UserUploadTaskSourceField } from '@components/user-profile-fields/user-upload-task-source-field/user-upload-task-source-field.component';
import { useCreateTask } from './create-task.hook';
import { getValidationResult, handleFileChange, handleOnSubmit } from './create-task.utils';

export const CreateTask: React.FC = () => {
  const {
    createTaskMutation,
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
    setPreview,
    previewFile,
    setPreviewFile,
    isRequiredFieldsFilled,
    isUploadTaskSourceVisible,
    settings
  } = useCreateTask();

  return (
    <form
      className={css['create-task__forms']}
      onSubmit={e => {
        e.preventDefault();
        handleOnSubmit({
          createTaskMutation,
          setIsTaskCreated,
          taskName,
          description,
          settings,
          previewFile
        });
      }}
    >
      <UserInputField
        title="Название задачи"
        subtitle="Это название задачи, которое будут видеть пользователи"
        footerText="Пожалуйста, используйте не больше 32 символов"
        validate={data => getValidationResult({ value: data, type: 'taskName' })}
        onChangeInput={data =>
          getValidationResult({ value: data, type: 'taskName' }) === true
            ? setTaskName(data)
            : setTaskName('')
        }
      />
      <UserTextareaField
        title="Описание задачи"
        subtitle="Опишите пользователям, о чем будет ваша задача"
        validate={data => getValidationResult({ value: data, type: 'description' })}
        onChangeInput={data =>
          getValidationResult({ value: data, type: 'description' }) === true
            ? setDescription(data)
            : setDescription('')
        }
      />
      <UserPreviewTaskField
        title="Иконка вашей задачи"
        subtitle="Иконку вашей задачи увидят другие пользователи"
        mainText="Нажмите на картинку, чтобы сменить иконку"
        img={preview}
        handleFileChange={event => handleFileChange({ event, setPreviewFile, setPreview })}
      />

      {isUploadTaskSourceVisible && (
        <UserUploadTaskSourceField
          taskId={createdTaskId!}
          uploadTaskSource={uploadTaskSourceMutation}
          isError={isError}
          isLoading={isLoading}
        />
      )}

      <Button theme="accent" disabled={!isRequiredFieldsFilled}>
        Создать задачу
      </Button>
    </form>
  );
};
