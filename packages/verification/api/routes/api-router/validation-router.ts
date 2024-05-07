import { Router } from 'express';
import { QUERY_KEYS } from '../../query-keys';
import { validationMiddleware } from '../../../domain/middleware';
import { check } from 'express-validator';

import { uploadTaskVerificationsController } from '../../controllers';
import { controllerErrorBounding } from '../../../domain/errors';

const validationRouter = Router();

validationRouter.post(
    QUERY_KEYS.UPLOAD_TASK_VERIFICATIONS,

    validationMiddleware([check('taskId').isString]),

    controllerErrorBounding(uploadTaskVerificationsController)
);

export { validationRouter };
