import { TValidator } from '../../../../domain/types';
import { CLIENT_ERRORS } from '../../../../domain/errors';
import { ICreateTaskDTO } from './delete-task';
import { Task } from '../../../../bd/schemas/task.schema';
import { SETTINGS } from '../../../../settings';

export const deleteTaskValidator: TValidator<ICreateTaskDTO> = async req => {
    const role = req.user?.claims.role;

    if (!SETTINGS.WHO_CAN_CREATE_TASKS.includes(role as any)) {
        return CLIENT_ERRORS.LACK_OF_RIGHTS;
    }

    const task = await Task.exists({ name: req.body.name });

    if (task) {
        return CLIENT_ERRORS.NAME_IS_ALREADY_USED;
    }
};
