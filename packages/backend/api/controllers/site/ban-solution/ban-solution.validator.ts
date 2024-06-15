import { ERoles, User } from '../../../../bd';
import { TValidator } from '../../../../domain/types';
import { CLIENT_ERRORS } from '../../../../domain/errors';
import { IBanSolutionDto } from './ban-solution';
import { Task } from '../../../../bd/schemas/task.schema';
import { Winners } from '../../../../bd/schemas/winners.schema';

export const banSolutionValidator: TValidator<IBanSolutionDto> = async req => {
    const role = req.user?.claims.role;
    const task = await Task.exists({ _id: req.body.taskId });
    const winners = await Winners.exists({ taskId: req.body.taskId });
    const user = await User.exists({ _id: req.body.userId });

    if (!task || !winners) {
        return CLIENT_ERRORS.TASK_DOESNT_EXIST;
    }

    if (!user) {
        return CLIENT_ERRORS.USER_DOESNT_EXISTS;
    }

    if (role !== ERoles.Admin) {
        return CLIENT_ERRORS.LACK_OF_RIGHTS;
    }
};
