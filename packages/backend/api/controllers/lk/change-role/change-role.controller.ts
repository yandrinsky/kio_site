import { IChangeRoleDto, IChangeRoleResponse } from './change-role';
import { User } from '../../../../bd';
import { TController } from '../../../../domain/types';

export const changeRoleController: TController<IChangeRoleDto> = async (req, resp) => {
    const { userId, role } = req.body;

    const user = await User.findOne({ _id: userId });

    user!.claims.role = role;
    await user!.save();

    const response: IChangeRoleResponse = { status: 'ok' };

    resp.status(200).json(response);
};
