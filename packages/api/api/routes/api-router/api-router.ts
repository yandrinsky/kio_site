import { Router } from 'express';
import { QUERY_KEYS } from '../../query-keys';
import { validationMiddleware } from '../../../domain/middleware';
import { check } from 'express-validator';

import {
    getCurrentSolutionController,
    startSolutionController,
    commitController,
    newTryController,
    switchTryController,
    switchHeadFrameController,
    getFrameController
} from '../../controllers';
import { controllerErrorBounding } from '../../../domain/errors';
import { loginController } from '../../controllers';
import { getSettingsController } from '../../controllers/api/get-settings';

const apiRouter = Router();

apiRouter.post(
    QUERY_KEYS.GET_CURRENT_SOLUTION,

    validationMiddleware([]),

    controllerErrorBounding(getCurrentSolutionController)
);

apiRouter.post(
    QUERY_KEYS.START_SOLUTION,

    validationMiddleware([]),

    controllerErrorBounding(startSolutionController)
);

apiRouter.post(
    QUERY_KEYS.COMMIT,

    validationMiddleware([
        check('tryId').isString(),
        check('parentId').isString(),
        check('state').isObject(),
        check('result').isObject(),
        check('comment').isString().optional()
    ]),

    controllerErrorBounding(commitController)
);

apiRouter.post(
    QUERY_KEYS.NEW_TRY,
    validationMiddleware([check('name').isString().optional()]),
    controllerErrorBounding(newTryController)
);

apiRouter.post(
    QUERY_KEYS.SWITCH_TRY,
    validationMiddleware([check('tryId').isString()]),
    controllerErrorBounding(switchTryController)
);

apiRouter.post(
    QUERY_KEYS.SWITCH_HEAD_FRAME,
    validationMiddleware([check('tryId').isString(), check('frameId').isString()]),
    controllerErrorBounding(switchHeadFrameController)
);

apiRouter.post(
    QUERY_KEYS.GET_FRAME,
    validationMiddleware([check('tryId').isString(), check('frameId').isString()]),
    controllerErrorBounding(getFrameController)
);

apiRouter.post(
    QUERY_KEYS.GET_SETTINGS,
    validationMiddleware([]),
    controllerErrorBounding(getSettingsController)
);

apiRouter.post(
    QUERY_KEYS.LOGIN,
    validationMiddleware([check('token').isString()]),
    controllerErrorBounding(loginController)
);

export { apiRouter };
