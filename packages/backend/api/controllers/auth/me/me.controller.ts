import { TController } from '../../../../domain/types';
import { IMeResponse } from './me';
import { User } from '../../../../bd';
import { CLIENT_ERRORS } from '../../../../domain/errors';

export const meController: TController<null> = async (req, resp) => {
    const user = await User.findOne({ email: req.user?.email });

    if (!user) {
        return resp.status(CLIENT_ERRORS.USER_DOESNT_EXISTS.code).json(CLIENT_ERRORS.USER_DOESNT_EXISTS);
    }

    const {
        displayName,
        name,
        surname,
        patronymic,
        claims: { role },
        avatarUrl,
        email,
        birthday,
        _id
    } = user;

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const isAgeDecreased =
        Number(String(month) + String(day).padStart(2, '0')) -
            Number(String(birthday.month) + String(birthday.day).padStart(2, '0')) <
        0;

    const response: IMeResponse = {
        displayName,
        name,
        surname,
        patronymic,
        role,
        avatarUrl,
        email,
        age: year - birthday.year - Number(isAgeDecreased),
        birthday,
        id: _id.toString()
    };

    resp.status(200).json(response);
};
