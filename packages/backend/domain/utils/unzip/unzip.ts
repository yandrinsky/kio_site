import { Readable } from 'node:stream';
import unzipper from 'unzipper';
import { IUnzip } from './unzip.types';

export const unzip: IUnzip = ({ onSuccess, onError, data, path, name = 'dist' }) =>
    new Promise((resolve, reject) => {
        const readableStream = Readable.from(data);

        readableStream
            .pipe(unzipper.Parse())

            .on('entry', function (entry) {
                const fullPath = entry.path; // полный путь включает имя папки и путь файла внутри архива
                const type = entry.type; // 'Directory' или 'File'

                // Извлекаем название первой найденной папки из полного пути
                const firstFolderName = fullPath.split('/')[0];

                // Если есть функция renameFolder, применяем её к первой папке
                const newFolderName = name;

                // Создаём новый путь для файла или папки внутри новой структуры
                const newFilePath = fullPath.replace(firstFolderName, newFolderName);

                if (type === 'File') {
                    // Извлекаем файлы в новую структуру папок
                    entry.pipe(unzipper.Extract({ path: `${path}/${newFilePath}` }));
                } else {
                    // Пропускаем самостоятельную обработку папок, т.к. они будут созданы при извлечении файлов
                    entry.autodrain();
                }
            })

            .on('close', () => {
                onSuccess?.();
                resolve();
            })

            .on('error', err => {
                onError?.(err);
                reject();
            });
    });
