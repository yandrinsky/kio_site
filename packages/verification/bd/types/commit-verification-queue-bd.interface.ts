export interface ICommitVerificationQueue {
    _id: string;
    commitId: string;
    taskId: string;
    tryId: string;
    isResultVerified: boolean | null;
    isStateVerified: boolean | null;
    comment: string;
    timestamp: number;
    solutionId: string;
}
export interface IUnverifiedCommitsList extends ICommitVerificationQueue {}
