'use client';

import { ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from '@/state/store';
import { Toaster } from 'react-hot-toast';
import RouteWatcher from '@/components/client/RouteWatcher';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <Toaster />
      <Provider store={store}>
        <RouteWatcher />
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </Provider>
    </>
  );
}
