export type IGetCreatedTasksListResponse = {
    id: string;
    name: string;
    description: string;
    isAvailable: boolean;
    isApproved: boolean;
    preview: string;
}[];
