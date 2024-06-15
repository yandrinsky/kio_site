export type IStartTaskDto = {
    taskId: string;
    loggedAs?: string;
};

export type IStartTaskResponse = {
    url: string;
    token: string;
};
