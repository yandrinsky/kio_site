export type IUnzip = (data: {
    onSuccess?: () => void;
    onError?: (err: Error) => void;
    path: string;
    data: Buffer;
    name?: string;
}) => Promise<void>;
