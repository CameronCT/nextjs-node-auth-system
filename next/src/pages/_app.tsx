import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'

import type { AppProps } from 'next/app'
import { SessionProvider } from '../contexts/Session.context'
import { ToastContainer } from 'react-toastify'
import { AppProvider } from '../contexts/App.context'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <ToastContainer />
            <AppProvider>
                <SessionProvider>
                    <Component {...pageProps} />
                </SessionProvider>
            </AppProvider>
        </>
    )
}

export default MyApp
