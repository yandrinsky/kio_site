import { UseMutateFunction } from '@tanstack/react-query';
import {
    IDeleteTaskDTO,
    IDeleteTaskResponse
} from '../../../../../../../../backend/api/controllers/lk/delete-task';
import { ICLIENT_ERROR } from '../../../../../../../../backend/domain/errors/client-errors';

export interface IUpdateTaskModal {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    updateTaskId: string;
    deleteTaskMutation: UseMutateFunction<IDeleteTaskResponse, ICLIENT_ERROR, IDeleteTaskDTO, unknown>;
    setUpdateTaskId: React.Dispatch<React.SetStateAction<string | undefined>>;
}
