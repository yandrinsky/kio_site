import { TController } from '../../../domain/types/contoller.type';
import { User } from '../../../bd';
import { CLIENT_ERRORS } from '../../../domain/errors/client-errors';
import { ISetDisplayNameDto, ISetDisplayNameDtoResponse } from './set-display-name';

export const setDisplayNameController: TController<ISetDisplayNameDto> = async (req, resp) => {
    const user = await User.findOne({ email: req.user?.email });

    if (!user) {
        resp.status(CLIENT_ERRORS.USER_DOESNT_EXITS.code).json(CLIENT_ERRORS.USER_DOESNT_EXITS);
        return;
    }

    user.displayName = req.body.displayName;
    await user.save();

    const response: ISetDisplayNameDtoResponse = { status: 'ok' };

    resp.status(200).json(response);
};
