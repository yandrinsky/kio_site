import { UserInputField } from '@components/user-profile-fields/user-input-field/user-input-field.component';
import css from './profile-create-task.module.css';
import { HeaderContent } from '../profile-content-header/header-content.component';
import { Button } from '@components/ui-kit/button/button.component';
import { useState } from 'react';
import { useCreateTaskMutation } from '@api/routes/create-task';

export const ProfileCreateTask = () => {
  const { mutate } = useCreateTaskMutation();

  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [preview, setPreview] = useState<string>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setPreview(reader.result); // Обновляем URL-адрес выбранного изображения
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOnSubmit = () => {
    mutate({
      name: taskName,
      description: description,
      settings: { test: 'test' }
    });
  };

  return (
    <form
      className={css['profile-create-task__forms']}
      onSubmit={e => {
        e.preventDefault();
        handleOnSubmit();
      }}
    >
      <HeaderContent
        title="Создание задачи"
        text={`
          Тут вы можете создать свою задачу.
        `}
      />
      <UserInputField
        title="Название задачи"
        subtitle="Это название задачи, которое будут видеть пользователи"
        footerText="Пожалуйста, используйте не больше 32 символов"
        value={taskName}
        validate={data => (data?.length < 2 ? 'Имя должно быть больше 1 символа' : true)}
        onSave={data => setTaskName(data)}
      />
      <UserInputField
        title="Описание задачи"
        subtitle="Опишите пользователям, о чем будет ваша задача"
        value={description}
        onSave={data => setDescription(data)}
      />
      <input onChange={handleFileChange} type="file" name="file" accept=".png, .jpeg, .jpg" />

      {preview && <img className={css['preview-image']} src={preview} alt="Preview" />}

      <Button>Создать задачу</Button>
    </form>
  );
};
