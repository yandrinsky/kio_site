import { BASE_URL } from '../constants/base';
import { makeRequest, useAppMutation } from '../utils';
import { INewTryDto, INewTryResponse } from '../../../../api/api';

import { TError } from '../api';
import { QUERY_KEYS } from '../constants/keys';

const NEW_TRY_URL = `${BASE_URL}/NEW_TRY_QUERY`;

export async function newTryRequest(body: INewTryDto) {
  return await makeRequest<INewTryResponse>(NEW_TRY_URL, {
    body
  });
}

export const useNewTryMutation = () => {
  return useAppMutation<INewTryResponse, TError, INewTryDto>({
    mutationKey: [QUERY_KEYS.NEW_TRY],
    mutationFn: newTryRequest,
    retry: 1
  });
};
