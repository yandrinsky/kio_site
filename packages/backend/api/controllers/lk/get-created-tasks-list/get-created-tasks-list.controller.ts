import { TController } from '../../../../domain/types';
import { Task } from '../../../../bd/schemas/task.schema';
import { IGetCreatedTasksListResponse } from './get-created-tasks-list';

export const getCreatedTasksListController: TController<null> = async (req, resp) => {
    const tasks =
        req.user?.claims.role === 'Admin'
            ? await Task.find()
            : await Task.find({ creatorId: req.user?._id ?? '' });

    const response: IGetCreatedTasksListResponse = tasks.map(
        ({ creatorId, name, _id, isAvailable, isApproved, preview, settings, description, url }) => ({
            name,
            description,
            isAvailable,
            creatorId,
            isApproved,
            preview,
            settings,
            url,
            id: _id
        })
    );

    resp.status(200).json(response);
};
