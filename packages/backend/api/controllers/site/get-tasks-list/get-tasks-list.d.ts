export type IGetTasksListResponse = {
    id: string;
    name: string;
    isAvailable: boolean;
    participateIn: boolean;
    preview?: string;
}[];
