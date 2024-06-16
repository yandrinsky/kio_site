import express from 'express';
import * as mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import { authMiddleware, errorBoundingMiddleware } from './domain/middleware';
import { authRouter, lkRouter, siteRouter } from './api';

const app = express();

const port = process.env.PORT ?? 3001;
const url = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?authSource=admin`;

const corsOptions: cors.CorsOptions = {
    origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
        console.log('origin', origin);
        // callback(null, origin === process.env.FRONT_DEV_URL || origin === process.env.FRONT_PROD_URL);
        callback(null, true);
    },
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(fileUpload({}));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('secret'));
app.set('trust proxy', true);
app.use(authMiddleware);

app.use(authRouter);
app.use(lkRouter);
app.use(siteRouter);

app.use(errorBoundingMiddleware);

app.listen(port, async () => {
    await mongoose.connect(url);

    console.log(`App listening on port ${port}`);

    if (!process.env.KEY) {
        console.error('В .env нет KEY. Установите в KEY значение crypto.randomBytes(32)');
    }

    if (!process.env.KEY) {
        console.error('В .env нет IV. Установите в IV значение crypto.randomBytes(16)');
    }
});
