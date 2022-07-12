import { useState, createContext, useContext, useEffect, useCallback, ReactNode } from 'react'
import axios from '../utils/axiosConfig'
import Config from '../Config'
import Authentication from '../utils/Authentication'
import { AccountSessionData } from '../types'

interface ContextType {
    sessionData: AccountSessionData | null
    setSessionData: (user: AccountSessionData | null) => void
    getSessionData: () => void
    resetSessionData: () => void
    authSessionData: (token?: string, csrf?: string) => void
}

export const SessionContext = createContext<ContextType | null>(null)

export const SessionProvider = ({ children }: { children: ReactNode }) => {
    const [sessionData, setSessionData] = useState<AccountSessionData | null>(null)

    const getSessionData = useCallback(async () => {
        const response = await axios.get(`${Config.authUrl}/session`)
        const data = await response.data
        const getData = data.data
        setSessionData(getData)

        if (data.token) Authentication.updateAccessToken(data.token)
        if (data.csrf) Authentication.updateCSRFToken(data.csrf)
    }, [])

    const resetSessionData = useCallback(async () => {
        const response = await axios.get(`${Config.authUrl}/logout`)

        if (response && response.status === 200) {
            Authentication.updateAccessToken('')
            getSessionData()
        }
    }, [getSessionData])

    const authSessionData = useCallback(
        (token: string = '', csrf: string = '') => {
            Authentication.updateAccessToken(token)
            Authentication.updateCSRFToken(csrf)
            getSessionData()
        },
        [getSessionData]
    )

    useEffect(() => {
        getSessionData()
    }, [getSessionData])

    return (
        <SessionContext.Provider
            value={{
                sessionData,
                setSessionData,
                getSessionData,
                resetSessionData,
                authSessionData,
            }}
        >
            {children}
        </SessionContext.Provider>
    )
}

export const useSessionContext = (): ContextType => {
    const context = useContext(SessionContext)

    if (context == null) {
        throw new Error('useSessionContext must be used within a SessionProvider')
    }

    return context
}
