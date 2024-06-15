import { BASE_URL } from '../../api/constants/base';
import { makeRequest, useAppMutation } from '../utils';

import { TError } from '../../api/api';
import { QUERY_KEYS } from '../../api/constants/keys';
import { IGetTaskDto, IGetTaskResponse } from '../../../../backend/api';

const GET_TASKS_URL = `${BASE_URL}/GET_TASK_QUERY`;

export async function getTasksRequest(body: IGetTaskDto) {
    return await makeRequest<IGetTaskResponse>(GET_TASKS_URL, {
        body
    });
}

export const useGetTasksMutation = () => {
    return useAppMutation<IGetTaskResponse, TError, IGetTaskDto>({
        mutationKey: [QUERY_KEYS.GET_TASK],
        mutationFn: getTasksRequest,
        retry: 1
    });
};
