import { TController } from '../../../../domain/types';
import { Task } from '../../../../bd/schemas/task.schema';
import { IGetTasksListResponse } from './get-tasks-list';
import { Solution } from '../../../../bd';
import { SERVER_ERRORS } from '../../../../domain/errors';

export const getTasksListController: TController<null> = async (req, resp) => {
    let mutablePromiseRes;

    try {
        mutablePromiseRes = await Promise.all([
            Solution.find({ ownerId: req.user?._id }).select('taskId'),
            Task.find({ isAvailable: true })
        ]);
    } catch (e) {
        return resp.status(SERVER_ERRORS.BD_ERROR.code).json(SERVER_ERRORS.BD_ERROR);
    }

    const [solutions, tasks] = mutablePromiseRes;

    const response: IGetTasksListResponse = tasks.map(task => ({
        id: task.id,
        name: task.name,
        preview: task.preview,
        isAvailable: task.isAvailable,
        participateIn: Boolean(solutions.find(el => el.taskId === task.id))
    }));

    resp.status(200).json(response);
};
