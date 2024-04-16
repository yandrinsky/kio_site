import React from 'react';
import css from './created-task-list.module.css';
import { ICreatedTaskList } from './created-task-list';

export const CreatedTaskList: React.FC<ICreatedTaskList> = ({ updateTask }) => {
  return (
    <div
      onClick={() => updateTask('test')}
      style={{ width: '200px', height: '100px', backgroundColor: 'gray' }}
    >
      Тестовая задача
    </div>
  );
};
