import { BASE_URL } from '../constants/base';
import { makeRequest, useAppMutation } from '../utils';

import { useQueryClient } from '@tanstack/react-query';
import { TError } from '../api';
import { QUERY_KEYS } from '../constants/keys';
import { ISetDisplayNameDto, ISetDisplayNameDtoResponse } from '../../../../backend/api';

const SET_DISPLAY_NAME_URL = `${BASE_URL}/SET_DISPLAY_NAME_QUERY`;

export async function setDisplayNameRequest(body: ISetDisplayNameDto) {
    return await makeRequest<ISetDisplayNameDtoResponse>(SET_DISPLAY_NAME_URL, {
        body
    });
}

export const useSetDisplayNameMutation = () => {
    const client = useQueryClient();

    return useAppMutation<ISetDisplayNameDtoResponse, TError, ISetDisplayNameDto>({
        mutationKey: [QUERY_KEYS.SET_DISPLAY_NAME],
        mutationFn: setDisplayNameRequest,
        retry: 1,
        onSuccess: () => {
            client.invalidateQueries([QUERY_KEYS.ME]);
        }
    });
};
