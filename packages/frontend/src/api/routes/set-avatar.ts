import { BASE_URL } from '../constants/base';
import { makeRequest, useAppMutation } from '../utils';

import { useQueryClient } from '@tanstack/react-query';
import { TError } from '../api';
import { QUERY_KEYS } from '../constants/keys';
import { ISetAvatarDto, ISetAvatarResponse } from '../../../../backend/api';

const SET_AVATAR_URL = `${BASE_URL}/SET_AVATAR_QUERY`;

export async function setAvatarRequest(body: ISetAvatarDto) {
    const formData = new FormData();
    formData.append('file', body.file);

    return await makeRequest<ISetAvatarResponse>(SET_AVATAR_URL, {
        body: formData
    });
}

export const useSetAvatarMutation = () => {
    const client = useQueryClient();

    return useAppMutation<ISetAvatarResponse, TError, ISetAvatarDto>({
        mutationKey: [QUERY_KEYS.SET_AVATAR],
        mutationFn: setAvatarRequest,
        retry: 1,
        onSuccess: () => {
            client.invalidateQueries([QUERY_KEYS.ME]);
        }
    });
};
