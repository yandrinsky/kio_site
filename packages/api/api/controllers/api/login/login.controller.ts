import { ILoginDto, ILoginResponse } from './login';
import { TController } from '../../../../domain/types';
import { TOKEN_COLLECTION } from '../../../../domain/token/token-collection';
import { keycloakApi } from '../../../../keycloak/api';
import { setAuthTokens } from '../../../../domain/token/token-service';
import { CLIENT_ERRORS } from '../../../../domain/errors';
import { decrypt } from '../../../../domain/utils/crypto/crypto';

export const loginController: TController<ILoginDto> = async (req, resp) => {
    const { token } = req.body;

    const decryptedToken = JSON.parse(decrypt(token));

    const refreshResult = await keycloakApi['refresh-user-access-token']({
        refresh_token: decryptedToken?.refreshToken
    });

    if (refreshResult.error) {
        resp.clearCookie(TOKEN_COLLECTION.ACCESS_TOKEN);
        resp.clearCookie(TOKEN_COLLECTION.REFRESH_TOKEN);

        return resp.status(CLIENT_ERRORS.BAD_TOKEN.code).json(CLIENT_ERRORS.BAD_TOKEN);
    }

    setAuthTokens({
        data: {
            refresh_token: refreshResult.refresh_token,
            access_token: refreshResult.access_token,
            taskId: decryptedToken.taskId
        },
        resp
    });

    const response: ILoginResponse = { status: 'ok' };

    resp.status(200).json(response);
};
