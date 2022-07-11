import axios from '../utils/axiosConfig';
import { toast } from 'react-toastify';
import Config from '../Config';
import Authentication from '../utils/Authentication';

const login = async (emailAddress: string, password: string) => {
  const response = await axios.post(`${Config.authUrl}/login`, {
    emailAddress,
    password,
    _csrf: Authentication.getCSRFToken()
  }).catch((e) => toast.error(e.response.data.message))
  return response;
};

const register = async (emailAddress: string, password: string, displayName: string) => {
  const response = await axios.post(`${Config.authUrl}/register`, {
    emailAddress,
    password,
    displayName,
    _csrf: Authentication.getCSRFToken()
  }).catch((e) => toast.error(e.response.data.message))
  return response;
};

const activate = async (emailAddress: string, code: string) => {
  const response = await axios.post(`${Config.authUrl}/activate`, {
    emailAddress,
    code,
    _csrf: Authentication.getCSRFToken()
  }).catch((e) => toast.error(e.response.data.message))
  return response;
};

const recoveryForgot = async (emailAddress: string) => {
  const response = await axios.post(`${Config.authUrl}/sendForgot`, {
    emailAddress,
    _csrf: Authentication.getCSRFToken()
  }).catch((e) => toast.error(e.response.data.message))
  return response;
};

const recoveryPassword = async (emailAddress: string, password: string, code: string) => {
  const response = await axios.post(`${Config.authUrl}/forgot`, {
    emailAddress,
    password,
    code,
    _csrf: Authentication.getCSRFToken()
  }).catch((e) => toast.error(e.response.data.message))
  return response;
};

const logout = async () => {
  const response = await axios.post(`${Config.authUrl}/auth/logout`, {}).catch((e) => toast.error(e.response.data.message))
  return response;
};

export default { login, register, activate, logout, recoveryForgot, recoveryPassword };
