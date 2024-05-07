import { BASE_URL } from '../constants/base';
import { makeRequest, useAppMutation } from '../utils';

import { TError } from '../api';
import { QUERY_KEYS } from '../constants/keys';
import { IStartTaskDto, IStartTaskResponse } from '../../../../backend/api/controllers';

const START_TASK_URL = `${BASE_URL}/START_TASK_QUERY`;

export async function startTaskRequest(body: IStartTaskDto) {
    return await makeRequest<IStartTaskResponse>(START_TASK_URL, {
        body
    });
}

export const useStartTaskMutation = () => {
    return useAppMutation<IStartTaskResponse, TError, IStartTaskDto>({
        mutationKey: [QUERY_KEYS.START_TASK],
        mutationFn: startTaskRequest,
        retry: 1
    });
};
