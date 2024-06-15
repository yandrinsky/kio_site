import { TValidator } from '../../../../domain/types';
import { CLIENT_ERRORS } from '../../../../domain/errors';
import { ICommitDto } from './commit';

export const commitValidator: TValidator<ICommitDto> = async req => {
    if (req.isLoggedAs) {
        return CLIENT_ERRORS.LACK_OF_RIGHTS;
    }
};
