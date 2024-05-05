import { BASE_URL } from '../constants/base';
import { makeRequest, useAppMutation } from '../utils';
import { IGetCurrentSolutionDto, IGetCurrentSolutionResponse } from '../../../../api/api';

import { TError } from '../api';
import { QUERY_KEYS } from '../constants/keys';

const GET_CURRENT_SOLUTION_URL = `${BASE_URL}/GET_CURRENT_SOLUTION_QUERY`;

export async function getCurrentSolutionRequest(body: IGetCurrentSolutionDto) {
  return await makeRequest<IGetCurrentSolutionResponse>(GET_CURRENT_SOLUTION_URL, {
    body
  });
}

export const useGetCurrentSolutionMutation = () => {
  return useAppMutation<IGetCurrentSolutionResponse, TError, IGetCurrentSolutionDto>({
    mutationKey: [QUERY_KEYS.GET_CURRENT_SOLUTION],
    mutationFn: getCurrentSolutionRequest,
    retry: 1
  });
};
