import { Response } from 'express';

export type ISetAuthTokens = ({
    data,
    resp
}: {
    data: { access_token: string; refresh_token: string; taskId: string };
    resp: Response;
}) => Response;
