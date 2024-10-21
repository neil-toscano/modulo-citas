"use client";

import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { ModalsProvider } from '@mantine/modals';
import { Provider } from 'react-redux';
import store from "@/redux/store";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from "react";

export function Providers({ children }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}> 
        <MantineProvider forceColorScheme="light" theme="light" withNormalizeCSS>
          <ModalsProvider>
            <Notifications />
            {children}
          </ModalsProvider>
        </MantineProvider>
      </QueryClientProvider>
    </Provider>
  );
}
