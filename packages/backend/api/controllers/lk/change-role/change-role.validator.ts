import { IChangeRoleDto } from './change-role';
import { TValidator } from '../../../../domain/types';
import { CLIENT_ERRORS } from '../../../../domain/errors';
import { ERoles, User } from '../../../../bd';

export const changeRoleValidator: TValidator<IChangeRoleDto> = async req => {
    const { role, userId } = req.body;

    if (req.user?.claims.role !== ERoles.Admin) {
        return CLIENT_ERRORS.LACK_OF_RIGHTS;
    }

    if (!ERoles[role]) {
        return CLIENT_ERRORS.BAD_DTO;
    }

    if (userId === req.user?._id.toString()) {
        return CLIENT_ERRORS.LACK_OF_RIGHTS;
    }

    const user = await User.exists({ _id: userId });

    if (!user) {
        return CLIENT_ERRORS.USER_DOESNT_EXISTS;
    }
};
