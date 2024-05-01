import { ISearchUserDto, ISearchUserResponse } from './search-user';
import { User } from '../../../../bd';
import { TController } from '../../../../domain/types';

export const searchUserController: TController<ISearchUserDto> = async (req, resp) => {
    const { search } = req.body;

    const users = await User.find({
        $or: [
            {
                name: { $regex: search, $options: 'i' }
            },
            { surname: { $regex: search, $options: 'i' } },
            { patronymic: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } }
        ]
    });

    const response: ISearchUserResponse = users.map(user => ({
        name: user.name,
        surname: user.surname,
        patronymic: user.patronymic,
        id: user._id,
        email: user.email,
        avatarUrl: user.avatarUrl,
        birthday: user.birthday
    }));

    resp.status(200).json(response);
};
