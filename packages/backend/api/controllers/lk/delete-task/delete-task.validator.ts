import { TValidator } from '../../../../domain/types';
import { CLIENT_ERRORS } from '../../../../domain/errors';
import { IDeleteTaskDTO } from './delete-task';
import { Task } from '../../../../bd/schemas/task.schema';
import { SETTINGS } from '../../../../settings';
import { ERoles } from '../../../../bd';

export const deleteTaskValidator: TValidator<IDeleteTaskDTO> = async req => {
    const role = req.user?.claims.role;

    if (!SETTINGS.WHO_CAN_DELETE_TASKS.includes(role as any)) {
        return CLIENT_ERRORS.LACK_OF_RIGHTS;
    }

    const task = await Task.findOne({ _id: req.body.taskId }).select('creatorId isApproved');

    if (!task) {
        return CLIENT_ERRORS.TASK_DOESNT_EXIST;
    }

    if (role === ERoles.Creator && (task?.creatorId !== req.user?._id || task.isApproved)) {
        return CLIENT_ERRORS.LACK_OF_RIGHTS;
    }
};
