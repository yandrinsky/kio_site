import { ERoles } from '../../../../bd';
import { TValidator } from '../../../../domain/types';
import { CLIENT_ERRORS } from '../../../../domain/errors';
import { Task } from '../../../../bd/schemas/task.schema';
import { IUpdateTaskDTO } from './update-task';

export const updateTaskValidator: TValidator<IUpdateTaskDTO> = async req => {
    const role = req.user?.claims.role;
    const { id, isAvailable } = req.body;

    if (role !== ERoles.Admin && role !== ERoles.Creator) {
        return CLIENT_ERRORS.LACK_OF_RIGHTS;
    }

    const task = await Task.findOne({ _id: id }).select('creatorId isApproved');

    if (!task) {
        return CLIENT_ERRORS.TASK_DOESNT_EXIST;
    }

    if (role === ERoles.Creator && (task?.creatorId !== req.user?._id || task.isApproved)) {
        return CLIENT_ERRORS.LACK_OF_RIGHTS;
    }

    //Только Admin может менять значения isAvailable
    if (isAvailable !== undefined && role !== ERoles.Admin) {
        return CLIENT_ERRORS.LACK_OF_RIGHTS;
    }

    if (isAvailable !== undefined && !task.isApproved) {
        return CLIENT_ERRORS.TASK_DOESNT_APPROVED;
    }
};
