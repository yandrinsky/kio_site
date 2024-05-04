import { BASE_URL } from '../../api/constants/base';
import { makeRequest } from '../utils';

import { useQuery } from '@tanstack/react-query';
import { TError } from '../../api/api';
import { QUERY_KEYS } from '../../api/constants/keys';
import { IGetCreatedTasksListResponse } from '../../../../backend/api/controllers';

const GET_CREATED_TASKS_LIST_URL = `${BASE_URL}/GET_CREATED_TASKS_LIST_QUERY`;

export async function getCreatedTasksListRequest() {
  return makeRequest<IGetCreatedTasksListResponse>(GET_CREATED_TASKS_LIST_URL);
}

export const useGetCreatedTasksListRequest = () =>
  useQuery<IGetCreatedTasksListResponse, TError>({
    queryKey: [QUERY_KEYS.GET_CREATED_TASKS_LIST],
    queryFn: () => getCreatedTasksListRequest(),
    keepPreviousData: true,
    refetchOnReconnect: true,
    staleTime: Infinity
  });
