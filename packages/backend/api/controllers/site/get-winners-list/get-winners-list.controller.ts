import { TController } from '../../../../domain/types';
import { IGetWinnersListDto, IGetWinnersListResponse } from './get-winners-list';
import { Winners } from '../../../../bd/schemas/winners.schema';
import { User } from '../../../../bd';

export const getWinnersListController: TController<IGetWinnersListDto> = async (req, resp) => {
    const winners = await Winners.findOne({ taskId: req.body.taskId });
    const users = await User.find({ _id: winners!.winners.map(winner => winner.ownerId) }).select(
        'name surname patronymic _id'
    );

    const response: IGetWinnersListResponse = winners!.winners.map(winner => {
        const user = users.find(user => user._id === winner.ownerId);

        return {
            result: winner.bestResult,
            name: `${user?.surname} ${user?.name} ${user?.patronymic}` ?? '',
            userId: user?._id ?? '',
            isResultVerify: winner.isVerified
        };
    });

    resp.status(200).json(response);
};
