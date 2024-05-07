import { BASE_URL } from '../../api/constants/base';
import { makeRequest } from '../utils';

import { useQuery } from '@tanstack/react-query';
import { TError } from '../../api/api';
import { QUERY_KEYS } from '../../api/constants/keys';
import { IGetTasksListResponse } from '../../../../backend/api/controllers';

const GET_TASKS_LIST_URL = `${BASE_URL}/GET_TASKS_LIST_QUERY`;

export async function getTasksListRequest() {
    return makeRequest<IGetTasksListResponse>(GET_TASKS_LIST_URL);
}

export const useGetTasksListRequest = () =>
    useQuery<IGetTasksListResponse, TError>({
        queryKey: [QUERY_KEYS.GET_TASKS_LIST],
        queryFn: () => getTasksListRequest(),
        keepPreviousData: true,
        refetchOnReconnect: true,
        staleTime: Infinity
    });
