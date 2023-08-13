import { HomeLayout } from '@/layout/HomeLayout';
import '@/styles/global.scss';
import { QueryClient, QueryClientProvider } from 'react-query';
import type { AppProps } from 'next/app';

// Create a new instance of QueryClient globally
const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      {/* Background gradient */}
      <div className="main">
        <div className="gradient" />
      </div>
      <main className="relative">
        {/* Loader element via Portals */}
        <div id="connect-loader" />
        <QueryClientProvider client={queryClient}>
          <HomeLayout>
            <Component {...pageProps} />
          </HomeLayout>
        </QueryClientProvider>
      </main>
    </>
  );
};

export default MyApp;
