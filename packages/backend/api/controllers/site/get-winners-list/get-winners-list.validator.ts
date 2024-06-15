import { ERoles } from '../../../../bd';
import { TValidator } from '../../../../domain/types';
import { CLIENT_ERRORS } from '../../../../domain/errors';
import { IGetWinnersListDto } from './get-winners-list';
import { Task } from '../../../../bd/schemas/task.schema';
import { Winners } from '../../../../bd/schemas/winners.schema';

export const getWinnersListValidator: TValidator<IGetWinnersListDto> = async req => {
    const role = req.user?.claims.role;
    const task = await Task.exists({ _id: req.body.taskId });
    const winners = await Winners.exists({ taskId: req.body.taskId });

    if (!task || !winners) {
        return CLIENT_ERRORS.TASK_DOESNT_EXIST;
    }

    // if (role !== ERoles.Admin) {
    //     return CLIENT_ERRORS.LACK_OF_RIGHTS;
    // }
};
