import { Schema, model } from 'mongoose';
import { randomUUID } from 'crypto';
import { ICommitVerificationQueue } from '../types/commit-verification-queue-bd.interface';

const commitVerificationQueueSchema = new Schema<ICommitVerificationQueue>(
    {
        _id: { type: String, default: randomUUID },
        commitId: { type: String, required: true },
        taskId: { type: String, required: true },
        tryId: { type: String, required: true },
        isResultVerified: { type: String, default: null },
        isStateVerified: { type: String, default: null },
        comment: { type: String, default: '' },
        timestamp: { type: Number, default: Date.now }
    },
    { _id: false }
);

export const CommitVerificationQueue = model('CommitVerificationQueue', commitVerificationQueueSchema);
