import { TValidator } from '../../../../domain/types';
import { CLIENT_ERRORS } from '../../../../domain/errors';
import { ERoles } from '../../../../bd';
import { ISearchUserDto } from './search-user';

export const searchUserValidator: TValidator<ISearchUserDto> = async req => {
    if (req.user?.claims.role !== ERoles.Admin) {
        return CLIENT_ERRORS.LACK_OF_RIGHTS;
    }
};
