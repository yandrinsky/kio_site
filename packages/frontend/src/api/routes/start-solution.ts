import { BASE_URL } from '../constants/base';
import { makeRequest, useAppMutation } from '../utils';
import { IStartSolutionDto, IStartSolutionResponse } from '../../../../api/api';

import { TError } from '../api';
import { QUERY_KEYS } from '../constants/keys';

const START_SOLUTION_URL = `${BASE_URL}/START_SOLUTION_QUERY`;

export async function startSolutionRequest(body: IStartSolutionDto) {
  return await makeRequest<IStartSolutionResponse>(START_SOLUTION_URL, {
    body
  });
}

export const useStartSolutionMutation = () => {
  return useAppMutation<IStartSolutionResponse, TError, IStartSolutionDto>({
    mutationKey: [QUERY_KEYS.START_SOLUTION],
    mutationFn: startSolutionRequest,
    retry: 1
  });
};
