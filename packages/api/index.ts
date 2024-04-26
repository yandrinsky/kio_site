import express from 'express';
import * as mongoose from 'mongoose';
import cors from 'cors';

import { errorBoundingMiddleware } from './domain/middleware';
import { apiRouter } from './api';
import { authMiddleware } from './domain/middleware/auth-middleware';
import cookieParser from 'cookie-parser';

const app = express();

const port = process.env.PORT ?? 3001;
const url = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?authSource=admin`;

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(cookieParser('secret'));
app.use(express.urlencoded({ extended: true }));
app.use(authMiddleware);

app.use(apiRouter);

app.use(errorBoundingMiddleware);

app.listen(port, async () => {
    await mongoose.connect(url);

    console.log(`App listening on port ${port}`);
});
