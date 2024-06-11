export type ISortBestResultConfig = Record<
    string,
    { type: 'min' | 'max' | 'equals'; equals?: number | string | boolean; order: number }
>;

export interface ITaskDB {
    _id: string;
    name: string;
    description: string;
    isAvailable: boolean;
    isApproved: boolean;
    settings: Record<string, any> & { sortBestResults: ISortBestResultConfig };
    preview: string;
    creatorId: string;
    timestamp: number;
    url: string;
}
