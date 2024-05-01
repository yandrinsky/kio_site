import { UseMutateFunction } from '@tanstack/react-query';
import { IUpdateTaskDTO, IUpdateTaskResponse } from '../../../../../../../backend/api';
import { ICLIENT_ERROR } from '../../../../../../../backend/domain/errors/client-errors';
import {
  IUploadTaskSourceDTO,
  IUploadTaskSourceResponse
} from '../../../../../../../backend/api/controllers';

export interface IUpdateTask {
  updateTaskId: string;
  setUpdateTaskId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export type IUseUpdateTask = (updateTaskId: string | undefined) => {
  updateTaskMutation: UseMutateFunction<IUpdateTaskResponse, ICLIENT_ERROR, IUpdateTaskDTO, unknown>;
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
};

export type IHandleFileChange = (props: {
  event: React.ChangeEvent<HTMLInputElement>;
  updateTaskMutation: UseMutateFunction<IUpdateTaskResponse, ICLIENT_ERROR, IUpdateTaskDTO, unknown>;
  updateTaskId: string;
}) => void;
