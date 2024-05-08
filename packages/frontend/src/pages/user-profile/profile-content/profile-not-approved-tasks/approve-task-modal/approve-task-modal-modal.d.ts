import { UseMutateFunction } from '@tanstack/react-query';
import { IApproveTaskDTO, IApproveTaskResponse } from '../../../../../../../backend/api';
import { ICLIENT_ERROR } from '../../../../../../../backend/domain/errors/client-errors';

export interface IApproveTaskModal {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIsCardOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    taskId: string;
    approveTaskMutation: UseMutateFunction<IApproveTaskResponse, ICLIENT_ERROR, IApproveTaskDTO, unknown>;
}
