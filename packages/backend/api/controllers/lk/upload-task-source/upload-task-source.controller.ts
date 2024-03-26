import { TController } from '../../../../domain/types';
import { IUploadTaskSourceDTO, IUploadTaskSourceResponse } from './upload-task-source';
import admZip from 'adm-zip';

export const uploadTaskSourceController: TController<IUploadTaskSourceDTO> = async (req, resp) => {
    const { id, taskSource } = req.body;

    const zip = new admZip(taskSource);
    const response: IUploadTaskSourceResponse = { status: 'ok' };

    resp.status(200).json(response);
};
