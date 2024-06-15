import { ERoles } from '../../../../bd';
import { TValidator } from '../../../../domain/types';
import { CLIENT_ERRORS } from '../../../../domain/errors';
import { IGetTaskDto } from './get-task';
import { Task } from '../../../../bd/schemas/task.schema';

export const getTaskValidator: TValidator<IGetTaskDto> = async req => {
    const role = req.user?.claims.role;
    const task = await Task.findOne({ _id: req.body.taskId }).select('isAvailable creatorId');

    if (!task) {
        return CLIENT_ERRORS.TASK_DOESNT_EXIST;
    }

    if (
        !task.isAvailable &&
        role !== ERoles.Admin &&
        role !== ERoles.Tester &&
        task.creatorId !== req.user?._id
    ) {
        return CLIENT_ERRORS.LACK_OF_RIGHTS;
    }
};
