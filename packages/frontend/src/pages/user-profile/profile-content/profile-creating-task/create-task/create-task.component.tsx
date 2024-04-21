import React from 'react';
import { UserInputField } from '@components/user-profile-fields/user-input-field/user-input-field.component';
import css from './create-task.module.css';
import { Button } from '@components/ui-kit/button/button.component';
import { useState } from 'react';
import { useCreateTaskMutation } from '@api/routes/create-task';
import { UserPreviewTaskField } from '@components/user-profile-fields/user-preview-task-field/user-preview-task-field.component';
import { ICreateTask } from './create-task';
import { useUpdateTaskMutation } from '@api/routes/update-task';
import { UserTextareaField } from '@components/user-profile-fields/user-textarea-field/user-textarea-field.component';
import { useUploadTaskSourceMutation } from '@api/routes/upload-task-source';
import { useGetCreatedTasksListRequest } from '@api/routes/get-created-tasks-list';
import { useMeRequest } from '@api/index';
import { UserUploadTaskSourceField } from '@components/user-profile-fields/user-upload-task-source-field/user-upload-task-source-field.component';

export const CreateTask: React.FC<ICreateTask> = ({ updateTaskId, setUpdateTaskId }) => {
  const {
    mutate: createTaskMutation,
    isError: isCreateTaskMutationError,
    isLoading: isCreateTaskMutationLoading
  } = useCreateTaskMutation();
  const { mutate: updateTaskMutation } = useUpdateTaskMutation();

  const { data: userData } = useMeRequest();

  const { data: taskList } = useGetCreatedTasksListRequest();
  const updatedTask = taskList?.filter(task => task.id === updateTaskId)[0];

  const [isTaskCreated, setIsTaskCreated] = useState(Boolean(updatedTask));
  const createdTaskId = taskList?.[taskList.length - 1].id;

  const { mutate: uploadTaskSourceMutation, isError, isLoading } = useUploadTaskSourceMutation();

  const [taskName, setTaskName] = useState(updatedTask?.name ?? '');
  const [description, setDescription] = useState(updatedTask?.description ?? '');
  const [preview, setPreview] = useState(updatedTask?.preview ?? '');

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
        settings: { test: 'test' }
        // preview: formData
      });
      setIsTaskCreated(true);
    }
  };

  return (
    <form
      className={css['create-task__forms']}
      onSubmit={e => {
        e.preventDefault();
        handleOnSubmit();
      }}
    >
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

      {updatedTask ? (
        <div className={css['create-task__editable-buttons']}>
          <Button theme="accent" disabled={!isRequiredFieldsFilled}>
            Редактировать
          </Button>
          <Button
            theme="colored-red"
            onClick={() => {
              setUpdateTaskId(undefined);
              setTaskName('');
              setDescription('');
              setPreview('');
              setIsTaskCreated(false);
            }}
          >
            Отменить
          </Button>
        </div>
      ) : (
        <Button theme="accent" disabled={!isRequiredFieldsFilled}>
          Создать задачу
        </Button>
      )}
    </form>
  );
};
