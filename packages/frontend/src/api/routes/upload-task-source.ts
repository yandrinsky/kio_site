import { BASE_URL } from '../constants/base';
import { makeRequest, useAppMutation } from '../utils';

import { useQueryClient } from '@tanstack/react-query';
import { TError } from '../api';
import { QUERY_KEYS } from '../constants/keys';
import { IUploadTaskSourceDTO, IUploadTaskSourceResponse } from '../../../../backend/api/controllers';

const UPLOAD_TASK_SOURCE_URL = `${BASE_URL}/UPLOAD_TASK_SOURCE_QUERY`;

export async function setUploadTaskSourceRequest(body: IUploadTaskSourceDTO) {
    const formData = new FormData();
    Object.entries(body).forEach(([key, value]) => formData.append(key, value));

    return await makeRequest<IUploadTaskSourceResponse>(UPLOAD_TASK_SOURCE_URL, {
        body: formData
    });
}

export const useUploadTaskSourceMutation = () => {
    const client = useQueryClient();

    return useAppMutation<IUploadTaskSourceResponse, TError, IUploadTaskSourceDTO>({
        mutationKey: [QUERY_KEYS.UPLOAD_TASK_SOURCE],
        mutationFn: setUploadTaskSourceRequest,
        retry: 1,
        onSuccess: () => {
            client.invalidateQueries([QUERY_KEYS.GET_CREATED_TASKS_LIST]);
            client.invalidateQueries([QUERY_KEYS.GET_NOT_APPROVED_TASKS_LIST]);
        }
    });
};
