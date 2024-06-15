import { CommitVerificationQueue, Frame, IFrame } from '../../../../bd';
import { IGetCurrentSolutionResponse } from './get-current-solution';
import { CLIENT_ERRORS, SERVER_ERRORS } from '../../../../domain/errors';
import { TController } from '../../../../domain/types';
import { Solution, Try } from '../../../../bd';
import { treeForwardTraversal } from '../../../../domain/utils';
export const getCurrentSolutionController: TController<null> = async (req, resp) => {
    let solution;

    try {
        solution = await Solution.findOne({ ownerId: req.user?._id, taskId: req?.taskId });
    } catch (e) {
        return resp.status(SERVER_ERRORS.BD_ERROR.code).json(SERVER_ERRORS.BD_ERROR);
    }

    if (!solution) {
        return resp
            .status(CLIENT_ERRORS.SOLUTION_DOESNT_EXIST.code)
            .json(CLIENT_ERRORS.SOLUTION_DOESNT_EXIST);
    }

    const currentTry = await Try.findOne({ _id: solution.currentTryId });

    if (!currentTry) {
        return resp.status(CLIENT_ERRORS.TRY_DOESNT_EXIST.code).json(CLIENT_ERRORS.TRY_DOESNT_EXIST);
    }

    const commitsId: string[] = [];

    treeForwardTraversal(currentTry.framesTree, ({ _id }) => {
        commitsId.push(_id);
        return false;
    });

    let mutablePromiseRes;

    try {
        mutablePromiseRes = await Promise.all([
            Try.find({ _id: { $in: solution.tries } }, '_id name'),
            Frame.findOne({ _id: currentTry.headFrameId }),
            CommitVerificationQueue.find({ commitId: { $in: commitsId } })
        ]);
    } catch (e) {
        return resp.status(SERVER_ERRORS.BD_ERROR.code).json(SERVER_ERRORS.BD_ERROR);
    }

    let [tries, frame, verificationQueue] = mutablePromiseRes;

    //currentTry.framesTree mutation
    treeForwardTraversal(currentTry.framesTree, node => {
        const isResultVerified = verificationQueue.find(el => el.commitId === node._id)?.isResultVerified;
        node.isResultVerified = isResultVerified === undefined ? true : isResultVerified;

        return false;
    });

    const bestTry =
        solution.bestTryId === currentTry._id ? currentTry : await Try.findOne({ _id: solution.bestTryId });

    const response: IGetCurrentSolutionResponse = {
        id: solution._id,
        bestResult: bestTry?.bestResult ?? {},
        bestTryId: bestTry?._id ?? '',
        bestHeadFrameId: bestTry?.bestResultHeadFrameId ?? '',
        tries,
        currentTryId: solution.currentTryId,
        headFrameId: currentTry.headFrameId,
        framesTree: currentTry.framesTree,
        frame: frame as IFrame
    };
    resp.status(200).json(response);
};
