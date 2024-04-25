import { useMeRequest } from '@api/index';
import { useCreateTaskMutation } from '@api/routes/create-task';
import { useGetCreatedTasksListRequest } from '@api/routes/get-created-tasks-list';
import { useUpdateTaskMutation } from '@api/routes/update-task';
import { useUploadTaskSourceMutation } from '@api/routes/upload-task-source';
import { UseMutateFunction } from '@tanstack/react-query';
import { useState } from 'react';
import {
  ICreateTaskDTO,
  ICreateTaskResponse,
  IMeResponse,
  IUpdateTaskDTO,
  IUpdateTaskResponse
} from '../../../../../../../backend/api';
import { ICLIENT_ERROR } from '../../../../../../../backend/domain/errors/client-errors';
import {
  IUploadTaskSourceDTO,
  IUploadTaskSourceResponse
} from '../../../../../../../backend/api/controllers';

export type IUseCreateTask = (updateTaskId: string | undefined) => {
  createTaskMutation: UseMutateFunction<ICreateTaskResponse, ICLIENT_ERROR, ICreateTaskDTO, unknown>;
  isCreateTaskMutationError: boolean;
  isCreateTaskMutationLoading: boolean;
  updateTaskMutation: UseMutateFunction<IUpdateTaskResponse, ICLIENT_ERROR, IUpdateTaskDTO, unknown>;
  userData: IMeResponse | undefined;
  updatedTask:
    | {
        id: string;
        name: string;
        description: string;
        isAvailable: boolean;
        isApproved: boolean;
        preview: string;
        settings: object;
      }
    | undefined;
  isTaskCreated: boolean;
  setIsTaskCreated: React.Dispatch<React.SetStateAction<boolean>>;
  createdTaskId: string | undefined;
  uploadTaskSourceMutation: UseMutateFunction<
    IUploadTaskSourceResponse,
    ICLIENT_ERROR,
    IUploadTaskSourceDTO,
    unknown
  >;
  isError: boolean;
  isLoading: boolean;
  taskName: string;
  setTaskName: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  preview: string;
  setPreview: React.Dispatch<React.SetStateAction<string>>;
};

export const useCreateTask: IUseCreateTask = updateTaskId => {
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

  return {
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
  };
};
