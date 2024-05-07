import { Request } from 'express';
import { IUserBD } from '../../bd';

export interface CustomRequest<T> extends Request {
    body: T;
    user?: (IUserBD & { _id: string }) | null;
}
