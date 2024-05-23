import { TValidator } from '../../../../domain/types';
import { CLIENT_ERRORS } from '../../../../domain/errors';
import { ICreateTaskDTO } from './create-task';
import { Task } from '../../../../bd/schemas/task.schema';
import { SETTINGS } from '../../../../settings';

export const createTaskValidator: TValidator<ICreateTaskDTO> = async req => {
    const role = req.user?.claims.role;

    if (!SETTINGS.WHO_CAN_CREATE_TASKS.includes(role as any)) {
        return CLIENT_ERRORS.LACK_OF_RIGHTS;
    }

    try {
        req.body.settings && JSON.parse(req.body.settings);
    } catch (e) {
        return CLIENT_ERRORS.BAD_JSON;
    }

    const task = await Task.exists({ name: req.body.name });

    if (task) {
        return CLIENT_ERRORS.NAME_IS_ALREADY_USED;
    }
};
