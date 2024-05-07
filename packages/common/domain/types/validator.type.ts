import { CustomRequest } from './custom-request.type';
import { TError } from '../errors';
import { EErrorNames } from '../errors/client-errors';

export type TValidator<T> = (req: CustomRequest<T>) => Promise<TError<EErrorNames> | void>;
