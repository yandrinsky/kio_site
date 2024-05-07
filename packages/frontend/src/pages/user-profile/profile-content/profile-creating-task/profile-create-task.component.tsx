import css from './profile-creating-task.module.css';
import { useState } from 'react';
import { Header } from './header/header.component';
import { CreateTask } from './create-task/create-task.component';
import { CreatedTaskList } from './created-task-list/created-task-list.component';
import { UpdateTask } from './update-task/update-task.component';

export const ProfileCreatingTask = () => {
    const [toggle, setToggle] = useState(true);
    const [updateTaskId, setUpdateTaskId] = useState<string>();

    const updateTask = (id: string) => {
        setToggle(false);
        setUpdateTaskId(id);
    };

    return (
        <div className={css['profile-create-task__tab']}>
            <Header toggle={toggle} setToggle={setToggle} isUpdateTask={Boolean(updateTaskId)} />

            {toggle ? (
                <CreatedTaskList updateTask={updateTask} />
            ) : updateTaskId ? (
                <UpdateTask updateTaskId={updateTaskId} setUpdateTaskId={setUpdateTaskId} />
            ) : (
                <CreateTask />
            )}
        </div>
    );
};
