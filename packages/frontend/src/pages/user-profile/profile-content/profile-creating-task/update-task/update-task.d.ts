import { UseMutateFunction } from '@tanstack/react-query';
import { IUpdateTaskDTO, IUpdateTaskResponse } from '../../../../../../../backend/api';
import { ICLIENT_ERROR } from '../../../../../../../backend/domain/errors/client-errors';
import {
  IUploadTaskSourceDTO,
  IUploadTaskSourceResponse
} from '../../../../../../../backend/api/controllers';
import {
  IDeleteTaskDTO,
  IDeleteTaskResponse
} from '../../../../../../../backend/api/controllers/lk/delete-task';

export interface IUpdateTask {
  updateTaskId: string;
  setUpdateTaskId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export type IUseUpdateTask = (updateTaskId: string | undefined) => {
  userRole: string | undefined;
  updateTaskMutation: UseMutateFunction<IUpdateTaskResponse, ICLIENT_ERROR, IUpdateTaskDTO, unknown>;
  deleteTaskMutation: UseMutateFunction<IDeleteTaskResponse, ICLIENT_ERROR, IDeleteTaskDTO, unknown>;
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
  isAvailable: boolean;
  setIsAvailable: React.Dispatch<React.SetStateAction<boolean>>;
  preview: string;
  settings: string;
  isApproved: boolean;
  setSettings: React.Dispatch<React.SetStateAction<string>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type IHandleFileChange = (props: {
  event: React.ChangeEvent<HTMLInputElement>;
  updateTaskMutation: UseMutateFunction<IUpdateTaskResponse, ICLIENT_ERROR, IUpdateTaskDTO, unknown>;
  updateTaskId: string;
}) => void;

export type IHandleToggleChange = (props: {
  isApproved: boolean;
  updateTaskId: string;
  isAvailable: boolean;
  setIsAvailable: React.Dispatch<React.SetStateAction<boolean>>;
  updateTaskMutation: UseMutateFunction<IUpdateTaskResponse, ICLIENT_ERROR, IUpdateTaskDTO, unknown>;
}) => void;

export type IGetValidationResult = (props: {
  value: string;
  type: 'description' | 'taskName' | 'settings';
}) => boolean | string;
