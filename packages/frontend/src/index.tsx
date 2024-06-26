import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { REACT_ROUTER } from './router/routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider } from 'jotai';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 15 * 60 * 1000, // 15 minutes
            refetchOnWindowFocus: false,
            retry: false,
            retryOnMount: false
        },
        mutations: {}
    }
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <Provider>
                <RouterProvider router={REACT_ROUTER} />
                <ReactQueryDevtools position="bottom-right" />
            </Provider>
        </QueryClientProvider>
    </React.StrictMode>
);
