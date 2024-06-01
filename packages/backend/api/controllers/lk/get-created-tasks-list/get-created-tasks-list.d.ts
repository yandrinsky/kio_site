export type IGetCreatedTasksListResponse = {
    id: string;
    name: string;
    description: string;
    isAvailable: boolean;
    isApproved: boolean;
    creatorId: string;
    url: string;
    preview: string;
    settings: object;
}[];
