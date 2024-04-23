import { ILoginDto, ILoginResponse } from './login';
import { TController } from '../../../../domain/types';

export const loginController: TController<ILoginDto> = async (req, resp) => {
    const { token } = req.body;

    const response: ILoginResponse = { status: 'ok' };

    resp.status(200).json(response);
};
