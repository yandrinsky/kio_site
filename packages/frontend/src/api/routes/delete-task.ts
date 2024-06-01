import { BASE_URL } from '../constants/base';
import { makeRequest, useAppMutation } from '../utils';

import { useQueryClient } from '@tanstack/react-query';
import { TError } from '../api';
import { QUERY_KEYS } from '../constants/keys';
import { IDeleteTaskDTO, IDeleteTaskResponse } from '../../../../backend/api/controllers/lk/delete-task';

const DELETE_TASK_URL = `${BASE_URL}/DELETE_TASK_QUERY`;

export async function deleteTaskRequest(body: IDeleteTaskDTO) {
    return await makeRequest<IDeleteTaskResponse>(DELETE_TASK_URL, {
        body,
        method: 'DELETE'
    });
}

export const useDeleteTaskMutation = () => {
    const client = useQueryClient();

    return useAppMutation<IDeleteTaskResponse, TError, IDeleteTaskDTO>({
        mutationKey: [QUERY_KEYS.DELETE_TASK],
        mutationFn: deleteTaskRequest,
        retry: 1,
        onSuccess: () => {
            client.invalidateQueries([QUERY_KEYS.GET_NOT_APPROVED_TASKS_LIST]);
            client.invalidateQueries([QUERY_KEYS.GET_CREATED_TASKS_LIST]);
            client.invalidateQueries([QUERY_KEYS.GET_TASKS_LIST]);
        }
    });
};
