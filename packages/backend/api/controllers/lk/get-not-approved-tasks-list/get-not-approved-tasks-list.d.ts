export type IGetNotApprovedTasksListResponse = {
    id: string;
    name: string;
    isAvailable: boolean;
    preview?: string;
    createdDate: number;
    creator: {
        id: string;
        avatar: string;
        name: string;
        surname: string;
        patronymic: string;
        email: string;
    };
}[];
