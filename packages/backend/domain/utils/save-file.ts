import { existsSync, mkdirSync } from 'fs';
import { UploadedFile } from 'express-fileupload';
import { randomUUID } from 'crypto';
import path from 'path';
import fs from 'fs';

export const toSaveFileDir = (process.env.STATIC_DIR ?? 'public') + '/' + 'files/';
export const saveFile = async ({
    objectId,
    file
}: {
    objectId: string;
    file: UploadedFile | UploadedFile[];
}) => {
    const prepFile = Array.isArray(file) ? file[0] : file;

    const staticDir = process.env.STATIC_DIR ?? 'public';
    if (!fs.existsSync(staticDir)) {
        fs.mkdirSync(staticDir);
    }

    if (!fs.existsSync(staticDir + '/files')) {
        fs.mkdirSync(staticDir + '/files');
    }

    const folderName = `files/${objectId}`;
    const fileName = randomUUID() + path.extname(prepFile.name);
    const dir = staticDir + '/' + folderName;

    if (!existsSync(dir)) {
        mkdirSync(dir);
    }

    await prepFile.mv(`${dir}/${fileName}`);

    return folderName + '/' + fileName;
};
