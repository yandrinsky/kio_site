import { TController } from '../../../../domain/types';
import { IUploadTaskSourceDTO, IUploadTaskSourceResponse } from './upload-task-source';
import { UploadedFile } from 'express-fileupload';
import { toSaveFileDir } from '../../../../domain/utils/save-file';
import { CLIENT_ERRORS, SERVER_ERRORS } from '../../../../domain/errors';
import { unzip } from '../../../../domain/utils/unzip/unzip';

export const uploadTaskSourceController: TController<IUploadTaskSourceDTO> = async (req, resp) => {
    const { taskId } = req.body;
    const uploadedFile = req.files?.project as UploadedFile;

    if (Array.isArray(uploadedFile)) {
        return resp.status(CLIENT_ERRORS.BAD_DTO.code).send(CLIENT_ERRORS.BAD_DTO);
    }

    unzip({
        data: uploadedFile.data,
        path: toSaveFileDir + '/' + taskId + '/task-source/',
        onError: () => resp.status(SERVER_ERRORS.UNZIP_ERROR.code).json(SERVER_ERRORS.UNZIP_ERROR),
        onSuccess: () => {
            const response: IUploadTaskSourceResponse = { status: 'ok' };
            resp.status(200).json(response);
        }
    });
};
