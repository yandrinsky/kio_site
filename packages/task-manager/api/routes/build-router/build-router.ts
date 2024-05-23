import { Router } from 'express';
import { QUERY_KEYS } from '../../query-keys';
import { validationMiddleware } from '../../../domain/middleware';
import { check } from 'express-validator';

import { buildTaskController } from '../../controllers';
import { controllerErrorBounding } from '../../../domain/errors';

const buildRouter = Router();

buildRouter.post(
    QUERY_KEYS.BUILD_TASK,

    validationMiddleware([check('taskId').isString]),

    controllerErrorBounding(buildTaskController)
);

export { buildRouter };
