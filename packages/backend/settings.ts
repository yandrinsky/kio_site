import { ERoles } from './bd';

export const SETTINGS = {
    WHO_HAVE_ACCESS_TO_NON_APPROVED_TASKS: [ERoles.Tester, ERoles.Admin, ERoles.Creator],
    WHO_CAN_CREATE_TASKS: [ERoles.Admin, ERoles.Creator],
    WHO_CAN_DELETE_TASKS: [ERoles.Admin, ERoles.Creator]
} as const;
