import { IUploadTaskVerificationsResponse, IUploadTaskVerificationsDto } from './upload-task-verifications';
import { TController } from '../../../../domain/types';
import { saveFile, toSaveFileDir } from '../../../../domain/utils';
import fs from 'fs';

export const uploadTaskVerificationsController: TController<IUploadTaskVerificationsDto> = async (
    req,
    resp
) => {
    const getResult = Array.isArray(req.files!.file) ? req.files!.file[0] : req.files!.getResult;
    const stateChecker = Array.isArray(req.files!.file) ? req.files!.file[0] : req.files!.stateChecker;

    const { taskId } = req.body;

    if (fs.existsSync(toSaveFileDir + taskId)) {
        fs.rmSync(toSaveFileDir + taskId, { recursive: true, force: true });
    }

    fs.mkdirSync(toSaveFileDir + taskId);

    await saveFile({ objectId: taskId, file: getResult, fileName: 'resultChecker.js' });
    await saveFile({ objectId: taskId, file: stateChecker, fileName: 'stateChecker.js' });

    const response: IUploadTaskVerificationsResponse = { status: 'ok' };

    resp.status(200).json(response);
};
