import { TController } from '../../../domain/types/contoller.type';
import { User } from '../../../bd';
import { CLIENT_ERRORS } from '../../../domain/errors/client-errors';
import { ISetPatronymicResponse, ISetPatronymicDto } from './set-patronymic';

export const setPatronymicController: TController<ISetPatronymicDto> = async (req, resp) => {
    const user = await User.findOne({ email: req.user?.email });

    if (!user) {
        resp.status(CLIENT_ERRORS.USER_DOESNT_EXITS.code).json(CLIENT_ERRORS.USER_DOESNT_EXITS);
        return;
    }

    user.patronymic = req.body.patronymic;
    await user.save();

    const response: ISetPatronymicResponse = { status: 'ok' };

    resp.status(200).json(response);
};
