import axios from '../utils/axiosConfig';
import { toast } from 'react-toastify';
import Config from '../Config';
import Authentication from '../utils/Authentication';

type AxiosResponse = {
    status: number;
    message: string | null;
    data: unknown | any;
}

const login = async (emailAddress: string, password: string): Promise<AxiosResponse | null> => {
  const response = await axios.post(`${Config.authUrl}/login`, {
    emailAddress,
    password,
    _csrf: Authentication.getCSRFToken()
  }).catch((e) => toast.error(e.response.data.message))
  // @ts-ignore
  return response?.data || null;
};

const register = async (emailAddress: string, password: string, displayName: string): Promise<AxiosResponse | null> => {
  const response = await axios.post(`${Config.authUrl}/register`, {
    emailAddress,
    password,
    displayName,
    _csrf: Authentication.getCSRFToken()
  }).catch((e) => toast.error(e.response.data.message))
  // @ts-ignore
  return response?.data || null;
};

const activate = async (emailAddress: string, key: string): Promise<AxiosResponse | null> => {
  const response = await axios.post(`${Config.authUrl}/activate`, {
    emailAddress,
    key,
    _csrf: Authentication.getCSRFToken()
  }).catch((e) => toast.error(e.response.data.message))
  // @ts-ignore
  return response?.data || null;
};

const recoveryForgot = async (emailAddress: string): Promise<AxiosResponse | null> => {
  const response = await axios.post(`${Config.authUrl}/sendForgot`, {
    emailAddress,
    _csrf: Authentication.getCSRFToken()
  }).catch((e) => toast.error(e.response.data.message))
  // @ts-ignore
  return response?.data || null;
};

const recoveryPassword = async (emailAddress: string, password: string, key: string): Promise<AxiosResponse | null> => {
  const response = await axios.post(`${Config.authUrl}/forgot`, {
    emailAddress,
    password,
    key,
    _csrf: Authentication.getCSRFToken()
  }).catch((e) => toast.error(e.response.data.message))
  // @ts-ignore
  return response?.data || null;
};

const logout = async (): Promise<AxiosResponse | null> => {
  const response = await axios.post(`${Config.authUrl}/auth/logout`, {}).catch((e) => toast.error(e.response.data.message))
  // @ts-ignore
  return response?.data || null;
};

export default { login, register, activate, logout, recoveryForgot, recoveryPassword };
