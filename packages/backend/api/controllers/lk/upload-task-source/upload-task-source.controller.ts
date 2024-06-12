import { TController } from '../../../../domain/types';
import { IUploadTaskSourceDTO, IUploadTaskSourceResponse } from './upload-task-source';
import { UploadedFile } from 'express-fileupload';
import { toSaveFileDir } from '../../../../domain/utils/save-file';
import { SERVER_ERRORS } from '../../../../domain/errors';
import { unzip } from '../../../../domain/utils/unzip/unzip';
import { Task } from '../../../../bd/schemas/task.schema';
import path from 'path';

export const uploadTaskSourceController: TController<IUploadTaskSourceDTO> = async (req, resp) => {
    const { taskId } = req.body;
    const projectCode = req.files?.project as UploadedFile;
    const stateChecker = req.files?.stateChecker as UploadedFile;
    const getResult = req.files?.getResult as UploadedFile;
    const task = await Task.findOne({ _id: taskId });

    await unzip({
        data: projectCode.data,
        path: path.join(toSaveFileDir, taskId, 'task-source'),
        onError: () => resp.status(SERVER_ERRORS.UNZIP_ERROR.code).json(SERVER_ERRORS.UNZIP_ERROR)
    });

    const formData = new FormData();
    const stateCheckerBlob = new Blob([stateChecker.data], { type: stateChecker.mimetype });
    const getResultBlob = new Blob([getResult.data], { type: getResult.mimetype });

    formData.append('stateChecker', stateCheckerBlob);
    formData.append('getResult', getResultBlob);
    formData.append('taskId', taskId);

    try {
        await fetch('http://verification:3020/UPLOAD_TASK_VERIFICATIONS_QUERY', {
            method: 'POST',
            body: formData
        });
    } catch (e) {
        console.log(e);
    }

    try {
        fetch('http://host.docker.internal:3030/BUILD_TASK_QUERY', {
            method: 'POST',
            body: JSON.stringify({ taskId }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response?.json())
            .then(json => {
                task!.url = json.port;
                task!.save();
            })
            .catch(e => console.log('e'));
    } catch (e) {
        console.log(e);
    }

    const response: IUploadTaskSourceResponse = { status: 'ok' };
    return resp.status(200).json(response);
};
