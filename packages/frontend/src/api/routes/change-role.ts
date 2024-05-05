import { BASE_URL } from '../constants/base';
import { makeRequest, useAppMutation } from '../utils';

import { useQueryClient } from '@tanstack/react-query';
import { TError } from '../api';
import { QUERY_KEYS } from '../constants/keys';
import { IChangeRoleDto, IChangeRoleResponse } from '../../../../backend/api';

const CHANGE_ROLE_URL = `${BASE_URL}/CHANGE_ROLE_QUERY`;

export async function changeRoleRequest(body: IChangeRoleDto) {
  return await makeRequest<IChangeRoleResponse>(CHANGE_ROLE_URL, {
    body
  });
}

export const useChangeRoleMutation = () => {
  return useAppMutation<IChangeRoleResponse, TError, IChangeRoleDto>({
    mutationKey: [QUERY_KEYS.CHANGE_ROLE],
    mutationFn: changeRoleRequest,
    retry: 1
  });
};
