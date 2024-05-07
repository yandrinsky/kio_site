import { unlink } from 'fs';

export const removeFile = ({ link }: { link: string }) => {
    return new Promise(resolve => {
        const staticDir = process.env.STATIC_DIR ?? 'public';
        unlink(staticDir + '/' + link, resolve);
    });
};
