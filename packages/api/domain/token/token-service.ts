import { TOKEN_COLLECTION } from './token-collection';
import { ISetAuthTokens } from './token-service.types';

export const setAuthTokens: ISetAuthTokens = ({ data: { taskId, refresh_token, access_token }, resp }) => {
    if (access_token) {
        resp.cookie(TOKEN_COLLECTION.ACCESS_TOKEN, access_token, {
            httpOnly: true,
            signed: true,
            sameSite: true
        });
    }

    if (refresh_token) {
        resp.cookie(TOKEN_COLLECTION.REFRESH_TOKEN, refresh_token, {
            httpOnly: true,
            signed: true,
            sameSite: true
        });
    }

    if (taskId) {
        resp.cookie(TOKEN_COLLECTION.TASK_ID, taskId, {
            httpOnly: true,
            signed: true,
            sameSite: true
        });
    }

    return resp;
};
