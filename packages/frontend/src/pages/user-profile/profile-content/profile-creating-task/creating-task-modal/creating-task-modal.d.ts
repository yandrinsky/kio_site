import { UseMutateFunction } from '@tanstack/react-query';
import {
    IDeleteTaskDTO,
    IDeleteTaskResponse
} from '../../../../../../../backend/api/controllers/lk/delete-task';
import { ICLIENT_ERROR } from '../../../../../../../backend/domain/errors/client-errors';

export interface ICreatingTaskModal {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    userRole: string | undefined;
    taskId: string;
    updateTask: (id: string) => void
}
