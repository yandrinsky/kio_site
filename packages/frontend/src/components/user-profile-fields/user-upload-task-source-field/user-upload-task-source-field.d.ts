import { MutateOptions } from '@tanstack/react-query';
import { IUploadTaskSourceDTO, IUploadTaskSourceResponse } from '../../../../../backend/api/controllers';
import { ICLIENT_ERROR } from '../../../../../backend/domain/errors/client-errors';

export interface IUserUploadTaskSourceField {
  taskId: string;
  isError: boolean;
  isLoading: boolean;
  uploadTaskSource: (
    variables: IUploadTaskSourceDTO,
    options?:
      | MutateOptions<IUploadTaskSourceResponse, ICLIENT_ERROR, IUploadTaskSourceDTO, unknown>
      | undefined
  ) => void;
}
