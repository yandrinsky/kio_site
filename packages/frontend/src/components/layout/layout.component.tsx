import { FC, PropsWithChildren, useState } from 'react';
import { HeaderComponent } from '../header/header.component';
import { Footer } from '../footer/footer.component';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '@constants/routes';
import { useMeRequest } from '@api/index';

import { SplashScreen } from '@pages/splash/splash.page';
import { Toast } from '@components/ui-kit/toast/toast.component';
import { AUTH_ERRORS } from '@api/constants/response';

/**
 * @description Layout HOC for base settings for all pages
 * @param {boolean} withNav - if true, renders the navigation bar
 * @param {boolean} withHelp - if true, renders the help button
 * @param {boolean} withFooter - if true, renders the footer
 * @param {string} protectedFrom - if 'anonymous', redirects to default route if user is not logged in, if 'authorized', redirects to default route if user is logged in
 */
export const Layout: FC<PropsWithChildren<ILayout>> = ({
    withNav,
    withHelp,
    withFooter,
    children,
    protectedFrom
}) => {
    const { isLoading, error, data } = useMeRequest();

    if (isLoading && !error && !data) return <SplashScreen />;
    if (
        (error?.name === AUTH_ERRORS.UNAUTHORIZED && protectedFrom === 'anonymous') ||
        (data && error?.name !== AUTH_ERRORS.UNAUTHORIZED && protectedFrom === 'authorized')
    ) {
        return <Navigate to={ROUTES.DEFAULT_ROUTE} />;
    }

    return (
        <>
            <HeaderComponent withNav={withNav} withHelp={withHelp} />
            {children}
            {withFooter && <Footer />}
            <Toast />
        </>
    );
};
