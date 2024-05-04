import { Router } from 'express';
import { QUERY_KEYS } from '../../query-keys';
import { validationMiddleware } from '../../../domain/middleware';
import { check } from 'express-validator';

import { commitController } from '../../controllers';
import { controllerErrorBounding } from '../../../domain/errors';

const validationRouter = Router();

validationRouter.post(
    QUERY_KEYS.COMMIT,

    validationMiddleware([
        check('taskId').isString(),
        check('tryId').isString(),
        check('parentId').isString(),
        check('state').isObject(),
        check('result').isObject(),
        check('comment').isString().optional()
    ]),

    controllerErrorBounding(commitController)
);

export { validationRouter };
