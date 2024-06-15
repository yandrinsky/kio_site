import { UseMutateFunction } from '@tanstack/react-query';
import {
  ICreateTaskDTO,
  ICreateTaskResponse,
  IUploadTaskSourceDTO,
  IUploadTaskSourceResponse
} from '../../../../../../../backend/api/controllers';
import { ICLIENT_ERROR } from '../../../../../../../backend/domain/errors/client-errors';

export type IUseCreateTask = () => {
  createTaskMutation: UseMutateFunction<ICreateTaskResponse, ICLIENT_ERROR, ICreateTaskDTO, unknown>;
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
  previewFile: File | undefined;
  setPreviewFile: React.Dispatch<React.SetStateAction<File | undefined>>;
  isRequiredFieldsFilled: boolean;
  isUploadTaskSourceVisible: boolean;
  settings: any;
  setSettings: React.Dispatch<React.SetStateAction<string>>;
  rateTaskParams: IRateTaskParams[] | undefined,
  setRateTaskParams: React.Dispatch<React.SetStateAction<IRateTaskParams[] | undefined>>
};

export type IHandleFileChange = (props: {
  event: React.ChangeEvent<HTMLInputElement>;
  setPreviewFile: React.Dispatch<React.SetStateAction<File | undefined>>;
  setPreview: React.Dispatch<React.SetStateAction<string>>;
}) => void;

export type IHandleOnSubmit = (props: {
  createTaskMutation: UseMutateFunction<ICreateTaskResponse, ICLIENT_ERROR, ICreateTaskDTO, unknown>;
  setIsTaskCreated: React.Dispatch<React.SetStateAction<boolean>>;
  taskName: string;
  description: string;
  settings: string;
  previewFile: File | undefined;
}) => void;

export type IGetValidationResult = (props: {
  value: string;
  type: 'description' | 'taskName' | 'settings';
}) => boolean | string;

export type IRateTaskParams = {
  name: undefined | string,
  rate: undefined | number,
  equalItem?: string | number,
  comparisonMethod: undefined | string
}

export type ISortBestResultConfig = Record<
    string,
    { type: string; equals?: number | string | boolean; order: number }
>

export type IGetOrderAndType = (props: {
  comparisonMethod: string;
  rate: number;
  equalItem?: number | string;
}) => { type: string; order: number; equals?: number | string };
