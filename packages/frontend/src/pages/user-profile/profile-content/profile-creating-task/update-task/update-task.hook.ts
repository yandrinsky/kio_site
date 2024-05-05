import { useGetCreatedTasksListRequest } from '@api/routes/get-created-tasks-list';
import { useUpdateTaskMutation } from '@api/routes/update-task';
import { useUploadTaskSourceMutation } from '@api/routes/upload-task-source';
import { useState } from 'react';
import { IUseUpdateTask } from './update-task';
import { useDeleteTaskMutation } from '@api/routes/delete-task';
import { useMeRequest } from '@api/index';

export const useUpdateTask: IUseUpdateTask = updateTaskId => {
  const { mutate: updateTaskMutation } = useUpdateTaskMutation();
  const { data } = useMeRequest();
  const { mutate: deleteTaskMutation } = useDeleteTaskMutation();

  const { data: taskList } = useGetCreatedTasksListRequest();
  const updatedTask = taskList?.filter(task => task.id === updateTaskId)[0];

  const { mutate: uploadTaskSourceMutation, isError, isLoading } = useUploadTaskSourceMutation();

  const [taskName, setTaskName] = useState(updatedTask?.name ?? '');
  const [description, setDescription] = useState(updatedTask?.description ?? '');
  const [settings, setSettings] = useState(JSON.stringify(updatedTask?.settings));
  const [isAvailable, setIsAvailable] = useState(updatedTask?.isAvailable ?? false);

  const preview = updatedTask?.preview ?? '';

  return {
    userRole: data?.role,
    updateTaskMutation,
    deleteTaskMutation,
    uploadTaskSourceMutation,
    isError,
    isLoading,
    taskName,
    setTaskName,
    description,
    setDescription,
    isAvailable,
    setIsAvailable,
    preview,
    settings,
    setSettings
  };
};
