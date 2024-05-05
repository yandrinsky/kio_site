import { BASE_URL } from '../constants/base';
import { makeRequest, useAppMutation } from '../utils';
import { ISwitchTryDto, ISwitchTryResponse } from '../../../../api/api';

import { TError } from '../api';
import { QUERY_KEYS } from '../constants/keys';

const SWITCH_TRY_URL = `${BASE_URL}/SWITCH_TRY_QUERY`;

export async function switchTryRequest(body: ISwitchTryDto) {
  return await makeRequest<ISwitchTryResponse>(SWITCH_TRY_URL, {
    body
  });
}

export const useSwitchTryMutation = () => {
  return useAppMutation<ISwitchTryResponse, TError, ISwitchTryDto>({
    mutationKey: [QUERY_KEYS.SWITCH_TRY],
    mutationFn: switchTryRequest,
    retry: 1
  });
};
