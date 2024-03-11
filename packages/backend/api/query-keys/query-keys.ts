export const QUERY_KEYS = {
    SIGN_UP: '/SIGN_UP_QUERY',
    SIGN_IN: '/SIGN_IN_QUERY',
    ME: '/ME_QUERY',
    LOGOUT: '/LOGOUT_QUERY',

    SET_FULL_NAME: '/SET_FULL_NAME_QUERY',
    SET_DISPLAY_NAME: '/SET_DISPLAY_NAME_QUERY',
    SET_AVATAR: '/SET_AVATAR_QUERY',
    CHANGE_PASSWORD: '/CHANGE_PASSWORD_QUERY',
    CHANGE_ROLE: '/CHANGE_ROLE_QUERY',

    CREATE_TASK: '/CREATE_TASK_QUERY',
    UPDATE_TASK: '/UPDATE_TASK_QUERY',
    APPROVE_TASK: '/APPROVE_TASK_QUERY',
    GET_CURRENT_SOLUTION: '/GET_CURRENT_SOLUTION_QUERY',
    START_SOLUTION: '/START_SOLUTION_QUERY',
    COMMIT: '/COMMIT_QUERY',
    NEW_TRY: '/NEW_TRY_QUERY',
    SWITCH_TRY: '/SWITCH_TRY_QUERY',
    SWITCH_HEAD_FRAME: '/SWITCH_HEAD_FRAME_QUERY',

    GET_TASKS_LIST: '/GET_TASKS_LIST_QUERY',
    GET_TASK: '/GET_TASK_QUERY',
    GET_NOT_APPROVED_TASKS_LIST: '/GET_NOT_APPROVED_TASKS_LIST_QUERY'
};

export const QUERY_WITHOUT_AUTH = [QUERY_KEYS.SIGN_UP, QUERY_KEYS.SIGN_IN];
