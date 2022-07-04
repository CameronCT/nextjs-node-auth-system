import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';

import type { AppProps } from 'next/app'
import { SessionProvider } from '../contexts/Session.context';
import { ToastContainer } from 'react-toastify';

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <>
      <ToastContainer />
      <SessionProvider>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}

export default MyApp
