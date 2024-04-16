import React from 'react';
import { UserInputField } from '@components/user-profile-fields/user-input-field/user-input-field.component';
import css from './create-task.module.css';
import { Button } from '@components/ui-kit/button/button.component';
import { useState } from 'react';
import { useCreateTaskMutation } from '@api/routes/create-task';
import { UserPreviewTaskField } from '@components/user-profile-fields/user-preview-task-field/user-avatar-field.component';
import { ICreateTask } from './create-task';
import { useUpdateTaskMutation } from '@api/routes/update-task';
import { UserTextareaField } from '@components/user-profile-fields/user-textarea-field/user-textarea-field.component';

export const CreateTask: React.FC<ICreateTask> = ({ updateTaskId, setUpdateTaskId }) => {
  const { mutate: createTaskMutation } = useCreateTaskMutation();
  const { mutate: updateTaskMutation } = useUpdateTaskMutation();

  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [preview, setPreview] = useState('/default-avatar.svg');

  const formData = new FormData();

  const isRequiredFieldsFilled = taskName !== '' && description !== '';

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
    updateTaskId
      ? updateTaskMutation({
          id: updateTaskId,
          name: taskName,
          description: description,
          settings: { test: 'test' }
        })
      : createTaskMutation({
          name: taskName,
          description: description,
          settings: { test: 'test' },
          // preview: formData
        });
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

      {updateTaskId ? (
        <div>
          <Button onClick={() => setUpdateTaskId(undefined)} disabled={!isRequiredFieldsFilled}>
            Изменить
          </Button>
          <Button type="button" onClick={() => setUpdateTaskId(undefined)}>
            Отменить
          </Button>
        </div>
      ) : (
        <Button disabled={!isRequiredFieldsFilled}>Создать задачу</Button>
      )}
    </form>
  );
};
