import { TController } from '../../../../domain/types';
import { IBanSolutionResponse, IBanSolutionDto } from './ban-solution';
import { Winners } from '../../../../bd/schemas/winners.schema';
import { CLIENT_ERRORS } from '../../../../domain/errors';

export const banSolutionController: TController<IBanSolutionDto> = async (req, resp) => {
    const { userId, taskId } = req.body;

    const winners = await Winners.findOne({ taskId });

    const winner = winners!.winners.find(winner => winner.ownerId === userId);

    if (!winner) {
        return resp.status(CLIENT_ERRORS.USER_DOESNT_EXISTS.code).json(CLIENT_ERRORS.USER_DOESNT_EXISTS);
    }

    winner.isBanned = true;

    winners!.markModified('winners');
    await winners!.save();

    const response: IBanSolutionResponse = { status: 'ok' };
    resp.status(200).json(response);
};
