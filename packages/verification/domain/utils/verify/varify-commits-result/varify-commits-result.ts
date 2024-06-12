import { CommitVerificationQueue } from '../../../../bd/schemas/commit-verification-queue-bd.schema';
import { Frame } from '../../../../bd';
import fs from 'fs';
import { toSaveFileDir } from '../../save-file';
import ivm from 'isolated-vm';
import { deepEqual } from '../../deep-equal';
import { Task } from '../../../../bd/schemas/task.schema';
export const verifyCommitsResult = async () => {
    const commits = await CommitVerificationQueue.find({ isResultVerified: null }).limit(7);
    const codes: Record<string, string> = {};

    for (let i = 0; i < commits.length; i++) {
        const { taskId, commitId } = commits[i];
        const commit = await Frame.findOne({ _id: commitId });
        const task = await Task.findOne({ _id: taskId });

        if (!commit) {
            commits[i].deleteOne();
        }

        try {
            if (!codes[taskId]) {
                codes[taskId] = fs.readFileSync(toSaveFileDir + taskId + '/resultChecker.js', {
                    encoding: 'utf8'
                });
            }

            const isolate = new ivm.Isolate({ memoryLimit: 80 });

            const context = isolate.createContextSync();

            const jail = context.global;

            // This makes the global object available in the context as `global`. We use `derefInto()` here
            // because otherwise `global` would actually be a Reference{} object in the new isolate.
            jail.setSync('global', jail.derefInto());

            jail.setSync('deepEqual', deepEqual);

            jail.setSync('state', new ivm.ExternalCopy(commit!.state).copyInto());
            jail.setSync('settings', new ivm.ExternalCopy(task!.settings).copyInto());
            jail.setSync('userResult', new ivm.ExternalCopy(commit!.result).copyInto());

            let data: boolean = false;

            try {
                const hostile = isolate.compileScriptSync(`
                    ${codes[taskId]}
                    
                    const ourResult = getResult({state, result: userResult, settings});
                    deepEqual(ourResult, userResult);
                `);

                data = await hostile.run(context, { timeout: 3000 });
            } catch (e) {}

            console.log('verify', data);
            commits[i].isResultVerified = data;
            commits[i].save();
        } catch (e) {}
    }
};
