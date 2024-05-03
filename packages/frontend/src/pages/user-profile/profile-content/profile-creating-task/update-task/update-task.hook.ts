import { useGetCreatedTasksListRequest } from '@api/routes/get-created-tasks-list';
import { useUpdateTaskMutation } from '@api/routes/update-task';
import { useUploadTaskSourceMutation } from '@api/routes/upload-task-source';
import { useState } from 'react';
import { IUseUpdateTask } from './update-task';
import { useDeleteTaskMutation } from '@api/routes/delete-task';

export const useUpdateTask: IUseUpdateTask = updateTaskId => {
  const { mutate: updateTaskMutation } = useUpdateTaskMutation();
  const { mutate: deleteTaskMutation } = useDeleteTaskMutation();

  const { data: taskList } = useGetCreatedTasksListRequest();
  const updatedTask = taskList?.filter(task => task.id === updateTaskId)[0];

  const { mutate: uploadTaskSourceMutation, isError, isLoading } = useUploadTaskSourceMutation();

  const [taskName, setTaskName] = useState(updatedTask?.name ?? '');
  const [description, setDescription] = useState(updatedTask?.description ?? '');
  const preview = updatedTask?.preview ?? '';

  return {
    updateTaskMutation,
    deleteTaskMutation,
    uploadTaskSourceMutation,
    isError,
    isLoading,
    taskName,
    setTaskName,
    description,
    setDescription,
    preview
  };
};
