import { Schema, model } from 'mongoose';
import { randomUUID } from 'crypto';
import { ICommitVerificationQueue } from '../types';

const commitVerificationQueueSchema = new Schema<ICommitVerificationQueue>(
    {
        _id: { type: String, default: randomUUID },
        commitId: { type: String, required: true },
        taskId: { type: String, required: true },
        tryId: { type: String, required: true },
        isResultVerified: { type: Boolean, default: null },
        isStateVerified: { type: Boolean, default: null },
        comment: { type: String, default: '' },
        timestamp: { type: Number, default: Date.now },
        solutionId: { type: String, required: true }
    },
    { _id: false }
);

export const CommitVerificationQueue = model('CommitVerificationQueue', commitVerificationQueueSchema);
