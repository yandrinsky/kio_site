import { BASE_URL } from '../constants/base';
import { makeRequest, useAppMutation } from '../utils';
import { ICommitDto, ICommitResponse } from '../../../../api/api';

import { TError } from '../api';
import { QUERY_KEYS } from '../constants/keys';

const COMMIT_URL = `${BASE_URL}/COMMIT_QUERY`;

export async function commitRequest(body: ICommitDto) {
  return await makeRequest<ICommitResponse>(COMMIT_URL, {
    body
  });
}

export const useCommitMutation = () => {
  return useAppMutation<ICommitResponse, TError, ICommitDto>({
    mutationKey: [QUERY_KEYS.COMMIT],
    mutationFn: commitRequest,
    retry: 1
  });
};
