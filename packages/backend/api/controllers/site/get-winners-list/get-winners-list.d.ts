export type IGetWinnersListDto = {
    taskId: string;
};

export type IGetWinnersListResponse = {
    userId: string;
    name: string;
    result: Record<string, number>;
    isResultVerify: boolean;
}[];
