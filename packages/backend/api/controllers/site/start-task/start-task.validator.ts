import { ERoles } from '../../../../bd';
import { TValidator } from '../../../../domain/types';
import { CLIENT_ERRORS } from '../../../../domain/errors';
import { Task } from '../../../../bd/schemas/task.schema';
import { IStartTaskDto } from './start-task';

export const startTaskValidator: TValidator<IStartTaskDto> = async req => {
    const role = req.user?.claims.role;
    const task = await Task.findOne({ _id: req.body.taskId }).select('isApproved creatorId');

    if (!task) {
        return CLIENT_ERRORS.TASK_DOESNT_EXIST;
    }

    if (!task.isApproved && role !== ERoles.Admin && task.creatorId !== req.user?._id) {
        return CLIENT_ERRORS.LACK_OF_RIGHTS;
    }
};
