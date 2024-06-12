import mongoose from 'mongoose';

import { randomUUID } from 'crypto';
import { IWinners } from '../types/winners.interface';

const winnersSchema = new mongoose.Schema<IWinners>(
    {
        _id: { type: String, default: randomUUID },
        taskId: { type: String, required: true },
        winners: { type: [], default: [] }
    },
    { _id: false }
);

export const Winners = mongoose.model('Winners', winnersSchema);
