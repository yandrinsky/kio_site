export interface ICreateTaskDTO {
    name: string;
    description: string;
    settings: string;
    preview?: File;
}

export interface ICreateTaskResponse {
    taskId: string;
}
