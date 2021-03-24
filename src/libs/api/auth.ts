import axios, { updateTokens } from './axios';
import { storeTokens, storeAccessToken, clearTokens } from '../storageUtils';

export interface Credentials {
  username: string;
  password: string;
}

export const loginUser = async (credentials: Credentials): Promise<void> => {
  const res = await axios.post('/auth-token', credentials);

  storeTokens(res.data);
  updateTokens();
};

export const refreshAccessToken = async (refresh: string): Promise<void> => {
  const res = await axios.post('/auth-token/refresh', { refresh });

  storeAccessToken(res.data.access);
};

export const logoutUser = (): void => {
  clearTokens();
  updateTokens();
};
