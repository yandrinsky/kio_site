import { IGetSettingsResponse, IGetSettingsDto } from './get-settings';
import { CLIENT_ERRORS, SERVER_ERRORS } from '../../../../domain/errors';
import { TController } from '../../../../domain/types';
import { Task } from '../../../../bd/schemas/task.schema';
export const getSettingsController: TController<IGetSettingsDto> = async (req, resp) => {
    const { taskId } = req.body;

    let task;

    try {
        task = await Task.findOne({ _id: taskId });
    } catch (e) {
        return resp.status(SERVER_ERRORS.BD_ERROR.code).json(SERVER_ERRORS.BD_ERROR);
    }

    if (!task) {
        return resp.status(CLIENT_ERRORS.TASK_DOESNT_EXIST.code).json(CLIENT_ERRORS.TASK_DOESNT_EXIST);
    }

    const response: IGetSettingsResponse = { settings: task.settings };

    resp.status(200).json(response);
};
