import { BASE_URL } from '../constants/base';
import { makeRequest, useAppMutation } from '../utils';

import { useQueryClient } from '@tanstack/react-query';
import { TError } from '../api';
import { QUERY_KEYS } from '../constants/keys';
import { IUpdateTaskDTO, IUpdateTaskResponse } from '../../../../backend/api';

const UPDATE_TASK_URL = `${BASE_URL}/UPDATE_TASK_QUERY`;

export async function updateTaskRequest(body: IUpdateTaskDTO) {
  return await makeRequest<IUpdateTaskResponse>(UPDATE_TASK_URL, {
    body
  });
}

export const useUpdateTaskMutation = () => {
  const client = useQueryClient();

  return useAppMutation<IUpdateTaskResponse, TError, IUpdateTaskDTO>({
    mutationKey: [QUERY_KEYS.UPDATE_TASK],
    mutationFn: updateTaskRequest,
    retry: 1,
    onSuccess: () => {
      client.invalidateQueries([QUERY_KEYS.GET_NOT_APPROVED_TASKS_LIST, QUERY_KEYS.GET_CREATED_TASKS_LIST, QUERY_KEYS.GET_NOT_APPROVED_TASKS_LIST]);
    }
  });
};
