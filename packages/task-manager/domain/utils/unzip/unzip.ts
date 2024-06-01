import { Readable } from 'node:stream';
import unzipper from 'unzipper';
import { IUnzip } from './unzip.types';

export const unzip: IUnzip = ({ onSuccess, onError, data, path }) =>
    new Promise((resolve, reject) => {
        const readableStream = Readable.from(data);

        readableStream
            .pipe(unzipper.Extract({ path }))
            .on('close', () => {
                onSuccess?.();
                resolve();
            })

            .on('error', err => {
                onError?.(err);
                reject();
            });
    });
