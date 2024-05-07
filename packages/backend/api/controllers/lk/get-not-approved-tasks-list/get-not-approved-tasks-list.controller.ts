import { TController } from '../../../../domain/types';
import { Task } from '../../../../bd/schemas/task.schema';
import { IGetNotApprovedTasksListResponse } from './get-not-approved-tasks-list';
import { User } from '../../../../bd';

export const getNotApprovedTasksListController: TController<null> = async (req, resp) => {
    const tasks = await Task.find();
    const creators = await User.find({ _id: { $in: tasks.map(el => el.creatorId) } });

    const response: IGetNotApprovedTasksListResponse = tasks
        .map(
            task =>
                !task.isApproved && {
                    id: task._id,
                    name: task.name,
                    preview: task.preview,
                    isAvailable: task.isAvailable,
                    createdDate: task.timestamp,
                    creator: {
                        id: task.creatorId,
                        avatar: creators.find(user => user._id === task.creatorId)?.avatarUrl ?? '',
                        name: creators.find(user => user._id === task.creatorId)?.name ?? '',
                        surname: creators.find(user => user._id === task.creatorId)?.surname ?? '',
                        patronymic: creators.find(user => user._id === task.creatorId)?.patronymic ?? '',
                        email: creators.find(user => user._id === task.creatorId)?.email ?? ''
                    }
                }
        )
        .filter(Boolean) as IGetNotApprovedTasksListResponse;

    resp.status(200).json(response);
};
