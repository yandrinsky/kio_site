import { TController } from '../../../../domain/types';
import { Task } from '../../../../bd/schemas/task.schema';
import { IStartTaskResponse, IStartTaskDto } from './start-task';
import { TOKEN_COLLECTION } from '../../../../domain/token/token-collection';
import { decrypt, encrypt } from '../../../../domain/utils/crypto/crypto';

export const startTaskController: TController<IStartTaskDto> = async (req, resp) => {
    const task = await Task.findOne({ _id: req.body.taskId });

    const response: IStartTaskResponse = {
        url: task!.url,
        token: encrypt(JSON.stringify({ refreshToken: req.signedCookies[TOKEN_COLLECTION.REFRESH_TOKEN] }))
    };

    resp.status(200).json(response);
};
