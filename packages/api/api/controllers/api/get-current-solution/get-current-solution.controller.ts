import { Frame, IFrame } from '../../../../bd';
import { IGetCurrentSolutionResponse } from './get-current-solution';
import { CLIENT_ERRORS, SERVER_ERRORS } from '../../../../domain/errors';
import { TController } from '../../../../domain/types';
import { Solution, Try } from '../../../../bd';
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

    let mutablePromiseRes;

    try {
        mutablePromiseRes = await Promise.all([
            Try.find({ _id: { $in: solution.tries } }, '_id name'),
            Frame.findOne({ _id: currentTry.headFrameId })
        ]);
    } catch (e) {
        return resp.status(SERVER_ERRORS.BD_ERROR.code).json(SERVER_ERRORS.BD_ERROR);
    }

    let [tries, frame] = mutablePromiseRes;

    const response: IGetCurrentSolutionResponse = {
        tries,
        currentTryId: solution.currentTryId,
        headFrameId: currentTry.headFrameId,
        framesTree: currentTry.framesTree,
        frame: frame as IFrame
    };

    resp.status(200).json(response);
};
