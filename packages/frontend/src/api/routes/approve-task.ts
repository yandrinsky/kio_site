import { BASE_URL } from '../constants/base';
import { makeRequest, useAppMutation } from '../utils';

import { useQueryClient } from '@tanstack/react-query';
import { TError } from '../api';
import { QUERY_KEYS } from '../constants/keys';
import { IApproveTaskDTO, IApproveTaskResponse } from '../../../../backend/api';

const APPROVE_TASK_URL = `${BASE_URL}/APPROVE_TASK_QUERY`;

export async function approveTaskRequest(body: IApproveTaskDTO) {
    return await makeRequest<IApproveTaskResponse>(APPROVE_TASK_URL, {
        body
    });
}

export const useApproveTaskMutation = () => {
    const client = useQueryClient();

    return useAppMutation<IApproveTaskResponse, TError, IApproveTaskDTO>({
        mutationKey: [QUERY_KEYS.APPROVE_TASK],
        mutationFn: approveTaskRequest,
        retry: 1,
        onSuccess: () => {
            client.invalidateQueries([QUERY_KEYS.GET_NOT_APPROVED_TASKS_LIST]);
            client.invalidateQueries([QUERY_KEYS.GET_CREATED_TASKS_LIST]);
        }
    });
};
