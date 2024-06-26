import { ERoles } from '../../../../bd';
import { TValidator } from '../../../../domain/types';
import { CLIENT_ERRORS } from '../../../../domain/errors';
import { Task } from '../../../../bd/schemas/task.schema';
import { IUploadTaskSourceDTO } from './upload-task-source';
import { UploadedFile } from 'express-fileupload';

export const uploadTaskSourceValidator: TValidator<IUploadTaskSourceDTO> = async req => {
    const role = req.user?.claims.role;
    const { taskId } = req.body;

    const projectCode = req.files?.project as UploadedFile;
    const stateChecker = req.files?.stateChecker as UploadedFile;
    const resultChecker = req.files?.getResult as UploadedFile;

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

    if (!projectCode || Array.isArray(projectCode)) {
        console.log('here1');
        return CLIENT_ERRORS.BAD_DTO;
    }

    if (!stateChecker || Array.isArray(stateChecker)) {
        console.log('here2');
        return CLIENT_ERRORS.BAD_DTO;
    }

    if (!resultChecker || Array.isArray(resultChecker)) {
        console.log('here3');
        return CLIENT_ERRORS.BAD_DTO;
    }

    if (stateChecker.name.split('.').pop() !== 'js') {
        console.log('here4');
        return CLIENT_ERRORS.BAD_DTO;
    }

    if (resultChecker.name.split('.').pop() !== 'js') {
        console.log('here5');
        return CLIENT_ERRORS.BAD_DTO;
    }
};
