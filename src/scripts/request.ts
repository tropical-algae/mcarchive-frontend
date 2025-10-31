import axios from 'axios';
import { showMessage } from '@/scripts/componentCtrl'
import { useAuthStore } from '@/scripts/stores/userAuth'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  withCredentials: true
});

declare module 'axios' {
  interface AxiosInstance {
    <T = any>(config: AxiosRequestConfig): Promise<T>;
  }
}

request.interceptors.request.use(config => {
  const authStore = useAuthStore();
  const token = authStore.accessToken;
  const token_type = authStore.tokenType;
  if (token && token_type) config.headers.Authorization = `${token_type} ${token}`;
  return config;
}, error => Promise.reject(error));

request.interceptors.response.use(
  response => response.data,
  error => {
    const err_sts = error.response?.data.status || error.code
    const err_msg = error.response?.data.message || error.message
    console.log(error)
    showMessage(`Error status code ${err_sts}: ${err_msg}`)
    return Promise.reject(error);
  }
);

export default request;