export type ISetQueryArgs = Record<string, any> | ((query: Record<string, any>) => Record<string, any>);

export type ISetQuery = (arg: ISetQueryArgs) => void;
export type IDeleteQuery = (arg: string | string[]) => void;

export type IUseQuery = () => [{ [p: string]: any }, ISetQuery, IDeleteQuery];
