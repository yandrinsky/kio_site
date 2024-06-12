export interface IWinners {
    _id: string;
    taskId: string;
    winners: { solutionId: string; ownerId: string; bestResult: Record<string, any>; isVerified: boolean }[];
}
