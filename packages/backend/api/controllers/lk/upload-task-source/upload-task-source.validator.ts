import { ERoles } from '../../../../bd';
import { TValidator } from '../../../../domain/types';
import { CLIENT_ERRORS } from '../../../../domain/errors';
import { Task } from '../../../../bd/schemas/task.schema';
import { IUploadTaskSourceDTO } from './upload-task-source';

export const uploadTaskSourceValidator: TValidator<IUploadTaskSourceDTO> = async req => {
    const role = req.user?.claims.role;
    const { taskId } = req.body;

    if (role !== ERoles.Admin && role !== ERoles.Creator) {
        return CLIENT_ERRORS.LACK_OF_RIGHTS;
    }

    const task = await Task.findOne({ _id: taskId }).select('creatorId isApproved');

    if (!task) {
        return CLIENT_ERRORS.TASK_DOESNT_EXIST;
    }

    if (role === ERoles.Creator && (task?.creatorId !== req.user?._id || task.isApproved)) {
        return CLIENT_ERRORS.LACK_OF_RIGHTS;
    }
};
