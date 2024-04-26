import { TController } from '../../../../domain/types';
import { IDeleteTaskResponse, IDeleteTaskDTO } from './delete-task';
import { Task } from '../../../../bd/schemas/task.schema';
import { Frame, Solution, Try } from '../../../../bd';
import { treeForwardTraversal } from '../../../../domain/utils';
import * as fs from 'fs';

//Если задача еще не подтверждена, ее может удалить ее создатель. Если уже подтверждена, ее может удалить только Admin
export const deleteTaskController: TController<IDeleteTaskDTO> = async (req, resp) => {
    const { taskId } = req.body;

    const task = await Task.findOne({
        _id: taskId
    });

    const solutions = await Solution.find({ taskId: task!._id });

    for (let i = 0; i < solutions.length; i++) {
        const solution = solutions[i];
        const triesIds = solution.tries;
        const tries = await Try.find({ _id: { $in: triesIds } });

        for (let j = 0; j < tries.length; j++) {
            const currentTry = tries[j];

            if (!currentTry) {
                continue;
            }

            const frameIds: string[] = [];

            treeForwardTraversal(currentTry.framesTree, node => {
                frameIds.push(node._id);

                return false;
            });

            const frames = await Frame.find({ _id: { $in: frameIds } });
            frames.forEach(frame => frame.deleteOne());
            currentTry.deleteOne();
        }

        solution.deleteOne();
    }

    const path = './public/' + task!.preview.split('/').slice(0, 2).join('/');

    fs.rm(
        path,
        {
            recursive: true,
            force: true
        },
        () => {}
    );

    task!.deleteOne();

    //Удалить папку с файлами
    const response: IDeleteTaskResponse = { status: 'ok' };

    resp.status(200).json(response);
};
