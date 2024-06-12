import { ICommitResponse, ICommitDto } from './commit';
import { CLIENT_ERRORS, SERVER_ERRORS } from '../../../../domain/errors';
import { TController } from '../../../../domain/types';
import { Solution, Try, Frame, CommitVerificationQueue } from '../../../../bd';
import { getPathFromTreeFromEnd, treeForwardTraversal } from '../../../../domain/utils';
import { sortBestResult } from '../../../../domain/utils/sort-best-result';
import { Task } from '../../../../bd/schemas/task.schema';
import { Winners } from '../../../../bd/schemas/winners.schema';

export const commitController: TController<ICommitDto> = async (req, resp) => {
    const { parentId, tryId, comment, state, result } = req.body;

    let res;

    try {
        res = await Promise.all([
            Solution.findOne({ ownerId: req.user?._id, taskId: req.taskId }),
            Try.findOne({ _id: tryId }),
            Frame.findOne({ _id: parentId }, '-state -result'),
            Winners.findOne({ taskId: req.taskId })
        ]);
    } catch (e) {
        return resp.status(SERVER_ERRORS.BD_ERROR.code).json(SERVER_ERRORS.BD_ERROR);
    }

    let [solution, currentTry, parentFrame, winners] = res;

    if (!solution || !currentTry || !parentFrame || !winners) {
        return resp
            .status(CLIENT_ERRORS.SOLUTION_DOESNT_EXIST.code)
            .json(CLIENT_ERRORS.SOLUTION_DOESNT_EXIST);
    }

    const task = await Task.findOne({ _id: solution.taskId });

    if (!task) {
        return resp.status(CLIENT_ERRORS.TASK_DOESNT_EXIST.code).json(CLIENT_ERRORS.TASK_DOESNT_EXIST);
    }

    const parentTreeNode = treeForwardTraversal(currentTry.framesTree, ({ _id }) => _id === parentId);

    if (!parentTreeNode) {
        return resp.status(CLIENT_ERRORS.FRAME_DOESNT_EXIST.code).json(CLIENT_ERRORS.FRAME_DOESNT_EXIST);
    }

    const newFrame = new Frame({ state, result, comment: comment ?? null });

    parentTreeNode.children.push({
        parent: { data: { _id: parentTreeNode.data._id, createdAt: Date.now(), comment: comment ?? '' } },
        data: { _id: newFrame._id, createdAt: Date.now(), comment: comment ?? '' },
        children: []
    });

    solution.currentTryId = tryId;
    currentTry.headFrameId = newFrame._id;

    const CommitQueueItem = new CommitVerificationQueue({
        taskId: req.taskId,
        tryId,
        commitId: newFrame._id
    });

    let isNewBestResult = false;

    if (!currentTry.bestResult) {
        isNewBestResult = true;
    } else {
        const results = [currentTry.bestResult, result].sort((el1, el2) =>
            sortBestResult(el1, el2, task.settings.sortBestResults)
        );

        if (results[0] === result) {
            isNewBestResult = true;
        }
    }

    if (isNewBestResult) {
        currentTry.bestResult = result;
        currentTry.bestResultHeadFrameId = newFrame._id;

        if (solution.bestTryId !== currentTry._id) {
            let isBestInSolution = false;

            if (!solution.bestTryId) {
                solution.bestTryId = currentTry._id;
                isBestInSolution = true;
            } else {
                const bestTry = await Try.findOne({ _id: solution.bestTryId });

                if (!bestTry) {
                    solution.bestTryId = currentTry._id;
                }

                const results = [bestTry!.bestResult!, result].sort((el1, el2) =>
                    sortBestResult(el1, el2, task.settings.sortBestResults)
                );

                if (results[0] === result) {
                    solution.bestTryId = currentTry._id;
                }

                isBestInSolution = true;
            }

            //todo optimize, make async
            if (isBestInSolution) {
                const winner = winners.winners.find(winner => winner.ownerId === req.user?._id);

                const path = getPathFromTreeFromEnd(currentTry.framesTree, newFrame._id);
                const verifyFailedCommits = await CommitVerificationQueue.find({
                    commitId: { $in: path.map(el => el.data._id) },
                    isResultVerified: false
                });

                path.map(el => el.data._id);

                if (!winner) {
                    winners.winners.push({
                        solutionId: solution._id,
                        ownerId: req.user?._id ?? '',
                        bestResult: result,
                        isVerified: !Boolean(verifyFailedCommits.length)
                    });
                } else {
                    winner.bestResult = result;
                    winner.isVerified = !Boolean(verifyFailedCommits.length);
                }

                winners.winners.sort((win1, win2) =>
                    sortBestResult(win1?.bestResult, win2?.bestResult, task.settings.sortBestResults)
                );
            }
        }
    }

    winners.markModified('winners');
    currentTry.markModified('framesTree');
    currentTry.markModified('bestResult');

    await Promise.all([
        solution.save(),
        currentTry.save(),
        newFrame.save(),
        CommitQueueItem.save(),
        winners.save()
    ]);

    const response: ICommitResponse = { status: 'ok' };

    resp.status(200).json(response);
};
