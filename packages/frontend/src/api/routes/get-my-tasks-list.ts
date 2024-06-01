import { BASE_URL } from '../../api/constants/base';
import { makeRequest } from '../utils';

import { useQuery } from '@tanstack/react-query';
import { TError } from '../../api/api';
import { QUERY_KEYS } from '../../api/constants/keys';
import { IGetMyTasksListResponse } from '../../../../backend/api/controllers';

const GET_MY_TASKS_LIST_URL = `${BASE_URL}/GET_MY_TASKS_LIST_QUERY`;

export async function getMyTasksListRequest() {
    return makeRequest<IGetMyTasksListResponse>(GET_MY_TASKS_LIST_URL);
}

export const useGetMyTasksListRequest = () =>
    useQuery<IGetMyTasksListResponse, TError>({
        queryKey: [QUERY_KEYS.GET_MY_TASKS_LIST],
        queryFn: () => getMyTasksListRequest(),
        keepPreviousData: true,
        refetchOnReconnect: true,
        staleTime: Infinity
    });
