import { Router } from 'express';
import { QUERY_KEYS } from '../../query-keys';
import { validationMiddleware } from '../../../domain/middleware';
import { check } from 'express-validator';

import {
    getTasksListController,
    getTaskValidator,
    getTaskController,
    startTaskController,
    startTaskValidator
} from '../../controllers';
import { controllerErrorBounding } from '../../../domain/errors';
import { getWinnersListController, getWinnersListValidator } from '../../controllers/site/get-winners-list';
import { banSolutionController, banSolutionValidator } from '../../controllers/site/ban-solution';

const siteRouter = Router();

siteRouter.get(
    QUERY_KEYS.GET_TASKS_LIST,

    controllerErrorBounding(getTasksListController)
);

siteRouter.post(
    QUERY_KEYS.GET_TASK,

    validationMiddleware([check('taskId').isString()], getTaskValidator),

    controllerErrorBounding(getTaskController)
);

siteRouter.post(
    QUERY_KEYS.START_TASK,

    validationMiddleware([check('taskId').isString()], startTaskValidator),

    controllerErrorBounding(startTaskController)
);

siteRouter.post(
    QUERY_KEYS.GET_WINNERS_LIST,

    validationMiddleware([check('taskId').isString()], getWinnersListValidator),

    controllerErrorBounding(getWinnersListController)
);

siteRouter.post(
    QUERY_KEYS.BAN_SOLUTION,

    validationMiddleware([check('taskId').isString(), check('userId').isString], banSolutionValidator),

    controllerErrorBounding(banSolutionController)
);

export { siteRouter };
