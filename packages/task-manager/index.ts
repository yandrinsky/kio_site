import express from 'express';
import cors from 'cors';

import { errorBoundingMiddleware } from './domain/middleware';
import { buildRouter } from './api';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';

const app = express();

const port = process.env.PORT ?? 3030;

app.use(cors({ origin: 'localhost:3001' }));
app.use(fileUpload({}));
app.use(express.json());
app.use(cookieParser('secret'));
app.use(express.urlencoded({ extended: true }));
app.use(buildRouter);

app.use(errorBoundingMiddleware);

app.listen(port, async () => {
    console.log(`App listening on port ${port}`);
});
