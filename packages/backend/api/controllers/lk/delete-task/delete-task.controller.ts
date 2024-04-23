import { TController } from '../../../../domain/types';
import { IDeleteTaskResponse, IDeleteTaskDTO } from './delete-task';
import { Task } from '../../../../bd/schemas/task.schema';
import { saveFile } from '../../../../domain/utils/save-file';
import { Solution, Try } from '../../../../bd';
import { treeForwardTraversal } from '../../../../domain/utils';

//Если задача еще не подтверждена, ее может удалить создатель. Если уже подтверждена, ее может удалить только Admin
export const deleteTaskController: TController<IDeleteTaskDTO> = async (req, resp) => {
    const { id } = req.body;

    const task = await Task.findOne({
        _id: id
    });

    const solutions = await Solution.find({ taskId: task!._id });

    for (let i = 0; i < solutions.length; i++) {
        const solution = solutions[i];
        const tries = solution.tries;

        for (let j = 0; j < tries.length; j++) {
            const tryId = tries[j];
            const currentTry = await Try.findOne({ _id: tryId });

            if (currentTry) {
                treeForwardTraversal(currentTry.framesTree, node => {
                    console.log('node', node);
                    return true;
                });
            }
        }
        // await solution.deleteOne();
    }

    // await task!.deleteOne();

    //Удалить папку с файлами
    const response: IDeleteTaskResponse = { status: 'ok' };

    resp.status(200).json(response);
};
