import { BASE_URL } from '../constants/base';
import { makeRequest, useAppMutation } from '../utils';

import { TError } from '../api';
import { QUERY_KEYS } from '../constants/keys';
import {
    ISearchUserDto,
    ISearchUserResponse
} from '../../../../backend/api/controllers/lk/search-user/search-user';

const SEARCH_USER_URL = `${BASE_URL}/SEARCH_USER_QUERY`;

export async function searchUserRequest(body: ISearchUserDto) {
    return await makeRequest<ISearchUserResponse>(SEARCH_USER_URL, {
        body
    });
}

export const useSearchUserMutation = () => {
    return useAppMutation<ISearchUserResponse, TError, ISearchUserDto>({
        mutationKey: [QUERY_KEYS.SEARCH_USER],
        mutationFn: searchUserRequest,
        retry: 1
    });
};
