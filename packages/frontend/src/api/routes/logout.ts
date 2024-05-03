import { BASE_URL } from '../constants/base';
import { makeRequest, useAppMutation } from '../utils';

import { TError } from '../api';
import { QUERY_KEYS } from '../constants/keys';
import { ILogoutResponse } from '../../../../backend/api';
import { useQueryClient } from '@tanstack/react-query';

const LOGOUT_URL = `${BASE_URL}/LOGOUT_QUERY`;

export async function logoutRequest() {
  return await makeRequest<ILogoutResponse>(LOGOUT_URL, { method: 'POST' });
}

export const useLogoutMutation = () => {
  const client = useQueryClient();

  return useAppMutation<ILogoutResponse, TError>({
    mutationKey: [QUERY_KEYS.LOGOUT],
    mutationFn: logoutRequest,
    retry: 1,
    onSuccess: () => {
      client.invalidateQueries([QUERY_KEYS.ME]);
      client.invalidateQueries([QUERY_KEYS.GET_CREATED_TASKS_LIST]);
      client.invalidateQueries([QUERY_KEYS.GET_NOT_APPROVED_TASKS_LIST]);
    }
  });
};
