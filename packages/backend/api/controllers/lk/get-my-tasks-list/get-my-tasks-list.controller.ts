import { TController } from '../../../../domain/types';
import { Task } from '../../../../bd/schemas/task.schema';
import { IGetMyTasksListResponse } from './get-my-tasks-list';
import { Solution } from '../../../../bd';

export const getMyTasksListController: TController<null> = async (req, resp) => {
    const solutions = await Solution.find({ ownerId: req.user?._id }).select('taskId');
    const tasks = await Task.find({ _id: { $in: solutions.map(el => el.taskId) } }).select(
        '_id name preview'
    );

    const response: IGetMyTasksListResponse = tasks.map(el => ({
        id: el._id,
        name: el.name,
        preview: el.preview
    }));

    resp.status(200).json(response);
};
