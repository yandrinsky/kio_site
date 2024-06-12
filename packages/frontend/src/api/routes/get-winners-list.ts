import { BASE_URL } from '../constants/base';
import { makeRequest, useAppMutation } from '../utils';

import { TError } from '../api';
import { QUERY_KEYS } from '../constants/keys';
import {
    IGetWinnersListDto,
    IGetWinnersListResponse
} from '../../../../backend/api/controllers/site/get-winners-list';

const GET_TASKS_LIST_URL = `${BASE_URL}/GET_WINNERS_LIST_QUERY`;

export async function getWinnersListRequest(body: IGetWinnersListDto) {
    return await makeRequest<IGetWinnersListResponse>(GET_TASKS_LIST_URL, {
        body
    });
}

export const useGetWinnersListRequest = () => {
    return useAppMutation<IGetWinnersListResponse, TError, IGetWinnersListDto>({
        mutationKey: [QUERY_KEYS.GET_WINNERS_LIST],
        mutationFn: getWinnersListRequest,
        retry: 1
    });
};
