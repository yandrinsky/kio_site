import { Router } from 'express';
import { QUERY_KEYS } from '../../query-keys';
import { validationMiddleware } from '../../../domain/middleware';
import { check } from 'express-validator';

import {
    setDisplayNameController,
    setFullNameValidator,
    setFullNameController,
    setAvatarController,
    setAvatarValidator,
    createTaskController,
    getNotApprovedTasksListController,
    getNotApprovedTasksListValidator,
    approveTaskController,
    changePasswordController,
    changePasswordValidator,
    changeRoleController,
    changeRoleValidator,
    createTaskValidator,
    approveTaskValidator,
    updateTaskController,
    updateTaskValidator,
    uploadTaskSourceController,
    uploadTaskSourceValidator,
    getCreatedTasksListController,
    getCreatedTasksListValidator
} from '../../controllers';

import { controllerErrorBounding } from '../../../domain/errors';

const lkRouter = Router();

lkRouter.post(
    QUERY_KEYS.SET_FULL_NAME,
    validationMiddleware([check('name').isString(), check('surname').isString()], setFullNameValidator),
    controllerErrorBounding(setFullNameController)
);

lkRouter.post(
    QUERY_KEYS.SET_DISPLAY_NAME,
    validationMiddleware([check('displayName').isString()]),
    controllerErrorBounding(setDisplayNameController)
);

lkRouter.post(QUERY_KEYS.SET_AVATAR, validationMiddleware([], setAvatarValidator), setAvatarController);

lkRouter.post(
    QUERY_KEYS.CHANGE_PASSWORD,
    validationMiddleware(
        [check('oldPassword').isString(), check('newPassword').isString()],
        changePasswordValidator
    ),
    controllerErrorBounding(changePasswordController)
);

lkRouter.post(
    QUERY_KEYS.CHANGE_ROLE,
    validationMiddleware([check('role').isString(), check('userId').isString()], changeRoleValidator),
    controllerErrorBounding(changeRoleController)
);

lkRouter.get(
    QUERY_KEYS.GET_NOT_APPROVED_TASKS_LIST,
    validationMiddleware([], getNotApprovedTasksListValidator),
    controllerErrorBounding(getNotApprovedTasksListController)
);

lkRouter.get(
    QUERY_KEYS.GET_CREATED_TASKS_LIST,
    validationMiddleware([], getCreatedTasksListValidator),
    controllerErrorBounding(getCreatedTasksListController)
);

lkRouter.post(
    QUERY_KEYS.CREATE_TASK,

    validationMiddleware(
        [check('name').isString(), check('description').isString(), check('settings').optional()],
        createTaskValidator
    ),

    controllerErrorBounding(createTaskController)
);

lkRouter.post(
    QUERY_KEYS.UPDATE_TASK,

    validationMiddleware(
        [check('name').isString(), check('description').isString(), check('settings').isObject().optional()],
        updateTaskValidator
    ),

    controllerErrorBounding(updateTaskController)
);

lkRouter.post(
    QUERY_KEYS.APPROVE_TASK,

    validationMiddleware([check('taskId').isString()], approveTaskValidator),

    controllerErrorBounding(approveTaskController)
);

lkRouter.post(
    QUERY_KEYS.UPLOAD_TASK_SOURCE,

    validationMiddleware([], uploadTaskSourceValidator),
    controllerErrorBounding(uploadTaskSourceController)
);

export { lkRouter };
