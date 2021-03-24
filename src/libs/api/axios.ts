import axios from 'axios';
import { history, getRoute } from 'libs/router';
import { clearTokens, getAccessToken, getRefreshToken } from 'libs/storageUtils';
import { refreshAccessToken } from './auth';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Accept-Language': 'se',
  },
});

let refreshToken: string | null = null;
let accessToken: string | null = null;
let isRefresh = false;

export const updateTokens = (): void => {
  accessToken = getAccessToken() || null;
  refreshToken = getRefreshToken() || null;

  if (accessToken) {
    instance.defaults.headers.common.Authorization = `Token ${accessToken}`;
  } else {
    delete instance.defaults.headers.common.Authorization;
  }
};

instance.interceptors.response.use(
  response => response,
  async error => {
    if (error.response && error.response.status === 401 && !isRefresh) {
      if (refreshToken) {
        const originalRequest = error.config;
        isRefresh = true;
        try {
          await refreshAccessToken(refreshToken);
          updateTokens();
          originalRequest.headers.Authorization = `Token ${accessToken}`;

          return instance(originalRequest);
        } catch (e) {
          clearTokens();
          updateTokens();
          history.push(getRoute('login'));
          // eslint-disable-next-line no-undef
          return Promise.reject(error);
        } finally {
          isRefresh = false;
        }
      } else {
        clearTokens();
        updateTokens();
        history.push(getRoute('login'));
        // eslint-disable-next-line no-undef
        return Promise.reject(error);
      }
    }

    // eslint-disable-next-line no-undef
    return Promise.reject(error);
  },
);

updateTokens();

export default instance;
