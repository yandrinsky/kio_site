import { BASE_URL } from '../constants/base';
import { makeRequest, useAppMutation } from '../utils';

import { useQueryClient } from '@tanstack/react-query';
import { TError } from '../api';
import { QUERY_KEYS } from '../constants/keys';
import { ICreateTaskDTO, ICreateTaskResponse } from '../../../../backend/api';

const CREATE_TASK_URL = `${BASE_URL}/CREATE_TASK_QUERY`;

export async function createTaskRequest(body: ICreateTaskDTO) {
    const formData = new FormData();

    Object.entries(body).forEach(([key, value]) => {
        key === 'settings' ? formData.append(key, JSON.stringify(value)) : formData.append(key, value);
    });

    return await makeRequest<ICreateTaskResponse>(CREATE_TASK_URL, {
        body: formData
    });
}

export const useCreateTaskMutation = () => {
    const client = useQueryClient();

    return useAppMutation<ICreateTaskResponse, TError, ICreateTaskDTO>({
        mutationKey: [QUERY_KEYS.CREATE_TASK],
        mutationFn: createTaskRequest,
        retry: 1,
        onSuccess: () => {
            client.invalidateQueries([QUERY_KEYS.GET_NOT_APPROVED_TASKS_LIST]);
            client.invalidateQueries([QUERY_KEYS.GET_CREATED_TASKS_LIST]);
        }
    });
};
