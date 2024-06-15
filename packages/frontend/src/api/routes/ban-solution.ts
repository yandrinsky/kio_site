import { BASE_URL } from '../constants/base';
import { makeRequest, useAppMutation } from '../utils';

import { TError } from '../api';
import { QUERY_KEYS } from '../constants/keys';
import { useQueryClient } from '@tanstack/react-query';
import { IBanSolutionDto, IBanSolutionResponse } from '../../../../backend/api/controllers/site/ban-solution';

const BAN_SOLUTION_URL = `${BASE_URL}/BAN_SOLUTION_QUERY`;

export async function banSolutionRequest(body: IBanSolutionDto) {
    return await makeRequest<IBanSolutionResponse>(BAN_SOLUTION_URL, {
        body
    });
}

export const useBanSolutionMutation = () => {
    const client = useQueryClient();

    return useAppMutation<IBanSolutionResponse, TError, IBanSolutionDto>({
        mutationKey: [QUERY_KEYS.BAN_SOLUTION],
        mutationFn: banSolutionRequest,
        retry: 1,
        onSuccess: () => {
            client.invalidateQueries([QUERY_KEYS.GET_WINNERS_LIST]);
        }
    });
};
