import css from './profile-creating-task.module.css';
import { useState } from 'react';
import { Header } from './header/header.component';
import { CreateTask } from './create-task/create-task.component';
import { CreatedTaskList } from './created-task-list/created-task-list.component';

export const ProfileCreatingTask = () => {
  const [toggle, setToggle] = useState(true);
  const [updateTaskId, setUpdateTaskId] = useState<string>();

  const updateTask = (id: string) => {
    setToggle(true);
    setUpdateTaskId(id);
  };

  return (
    <div className={css['profile-create-task__tab']}>
      <Header toggle={toggle} setToggle={setToggle} />

      {toggle ? (
        <CreateTask updateTaskId={updateTaskId} setUpdateTaskId={setUpdateTaskId} />
      ) : (
        <CreatedTaskList updateTask={updateTask}/>
      )}
    </div>
  );
};
