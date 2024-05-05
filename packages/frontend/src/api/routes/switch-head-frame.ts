import { BASE_URL } from '../constants/base';
import { makeRequest, useAppMutation } from '../utils';
import { ISwitchHeadFrameDto, ISwitchHeadFrameResponse } from '../../../../api/api';

import { TError } from '../api';
import { QUERY_KEYS } from '../constants/keys';

const SWITCH_HEAD_FRAME_URL = `${BASE_URL}/SWITCH_HEAD_FRAME_QUERY`;

export async function switchHeadFrameRequest(body: ISwitchHeadFrameDto) {
  return await makeRequest<ISwitchHeadFrameResponse>(SWITCH_HEAD_FRAME_URL, {
    body
  });
}

export const useSwitchHeadFrameMutation = () => {
  return useAppMutation<ISwitchHeadFrameResponse, TError, ISwitchHeadFrameDto>({
    mutationKey: [QUERY_KEYS.SWITCH_HEAD_FRAME],
    mutationFn: switchHeadFrameRequest,
    retry: 1
  });
};
