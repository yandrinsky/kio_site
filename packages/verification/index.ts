import express from 'express';
import * as mongoose from 'mongoose';
import cors from 'cors';

import { errorBoundingMiddleware } from './domain/middleware';
import { validationRouter } from './api';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import fs from 'fs';
import { staticDir } from './domain/utils';

import { verifyCommitsResult } from './domain/utils/verify/varify-commits-result/varify-commits-result';

const app = express();

const port = process.env.PORT ?? 3001;
const url = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?authSource=admin`;

app.use(cors({ origin: 'localhost:3010' }));
app.use(fileUpload({}));
app.use(express.json());
app.use(cookieParser('secret'));
app.use(express.urlencoded({ extended: true }));
app.use(validationRouter);

app.use(errorBoundingMiddleware);

app.listen(port, async () => {
    await mongoose.connect(url);

    console.log(`App listening on port ${port}`);

    if (!fs.existsSync(staticDir)) {
        fs.mkdirSync(staticDir);

        fs.mkdirSync(staticDir + '/files');
    }

    setInterval(verifyCommitsResult, 30000);
});
