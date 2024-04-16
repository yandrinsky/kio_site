import { BASE_URL } from '../../api/constants/base';
import { makeRequest } from '../utils';

import { useQuery } from '@tanstack/react-query';
import { TError } from '../../api/api';
import { QUERY_KEYS } from '../../api/constants/keys';
import { IGetNotApprovedTasksListResponse } from '../../../../backend/api';

const GET_NOT_APPROVED_TASKS_LIST_URL = `${BASE_URL}/GET_NOT_APPROVED_TASKS_LIST_QUERY`;

export async function getNotApprovedTacksListRequest() {
  return makeRequest<IGetNotApprovedTasksListResponse>(GET_NOT_APPROVED_TASKS_LIST_URL);
}

export const useGetNotApprovedTacksListRequest = () =>
  useQuery<IGetNotApprovedTasksListResponse, TError>({
    queryKey: [QUERY_KEYS.GET_NOT_APPROVED_TASKS_LIST],
    queryFn: () => getNotApprovedTacksListRequest(),
    keepPreviousData: true,
    refetchOnReconnect: true,
    staleTime: Infinity
  });
