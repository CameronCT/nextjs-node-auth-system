import { FC, useState, createContext, useContext, useEffect, useRef, useCallback, ReactNode } from 'react';
import axios, { CancelTokenSource } from 'axios';
import Config from '../Config';
import Authentication from '../utils/Authentication';
import { AccountSessionData } from '../types';
import { toast } from 'react-toastify';

interface ContextType {
  sessionData: AccountSessionData | null;
  setSessionData: (user: AccountSessionData | null) => void;
  getSessionData: () => void;
  resetSessionData: () => void;
}

export const SessionContext = createContext<ContextType | null>(null);

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const axiosCancelSource = useRef<CancelTokenSource | null>(null);

  const [sessionData, setSessionData] = useState<AccountSessionData | null>(null);

  const getSessionData = useCallback(async () => {
    const response = await axios.get(`${Config.authUrl}/session`, {
      withCredentials: true,
      cancelToken: axiosCancelSource.current?.token,
    });
    const data = await response.data;
    const getData = data.data;
    setSessionData(getData);

    if (data.token) Authentication.updateAccessToken(data.token);
    if (data.csrf) Authentication.updateCSRFToken(data.csrf);
  }, []);

  const resetSessionData = useCallback(async () => {
    const response = await axios.get(`${Config.authUrl}/logout`, {
      withCredentials: true,
      cancelToken: axiosCancelSource.current?.token,
    });

    if (response && response.status === 200) {
      Authentication.updateAccessToken('');
      getSessionData();
    }
  }, [ getSessionData ]);

  useEffect(() => {
    axiosCancelSource.current = axios.CancelToken.source();
    getSessionData();
    return () => axiosCancelSource.current?.cancel();
  }, [getSessionData]);

  return (
    <SessionContext.Provider
      value={{
        sessionData,
        setSessionData,
        getSessionData,
        resetSessionData,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSessionContext = (): ContextType => {
  const context = useContext(SessionContext);

  if (context == null) {
    throw new Error('useSessionContext must be used within a SessionProvider');
  }

  return context;
};
