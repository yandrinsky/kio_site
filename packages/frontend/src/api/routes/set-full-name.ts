import { BASE_URL } from '../constants/base';
import { makeRequest, useAppMutation } from '../utils';

import { useQueryClient } from '@tanstack/react-query';
import { TError } from '../api';
import { QUERY_KEYS } from '../constants/keys';
import { ISetFullNameDto, ISetFullNameResponse } from '../../../../backend/api';

const SET_FULL_NAME_URL = `${BASE_URL}/SET_FULL_NAME_QUERY`;

export async function setFullNameRequest(body: ISetFullNameDto) {
    return await makeRequest<ISetFullNameResponse>(SET_FULL_NAME_URL, {
        body
    });
}

export const useSetFullNameMutation = () => {
    const client = useQueryClient();

    return useAppMutation<ISetFullNameResponse, TError, ISetFullNameDto>({
        mutationKey: [QUERY_KEYS.SET_FULL_NAME],
        mutationFn: setFullNameRequest,
        retry: 1,
        onSuccess: () => {
            client.invalidateQueries([QUERY_KEYS.ME]);
        }
    });
};
