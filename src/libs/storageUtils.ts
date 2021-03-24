/**
 * Used for manipulations with localStorage
 */

const ACCESS_TOKEN_KEY = '_me_access_token';
const REFRESH_TOKEN_KEY = '_me_refresh_token';
const LANGUAGE_KEY = '_me_language';

export interface Tokens {
  access: string;
  refresh: string;
}

type ArrowToString = () => string;

export const clearTokens: () => void = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

export const getAccessToken: ArrowToString = () => localStorage.getItem(ACCESS_TOKEN_KEY) || '';

export const getRefreshToken: ArrowToString = () => localStorage.getItem(REFRESH_TOKEN_KEY) || '';

export const isUserLogged: () => boolean = () => getAccessToken() !== '';

export const storeTokens = (tokens: Tokens): void => {
  localStorage.setItem(ACCESS_TOKEN_KEY, tokens.access);
  localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refresh);
};

export const storeAccessToken = (token: string): void => localStorage.setItem(ACCESS_TOKEN_KEY, token);

export const getTokens: () => Tokens = () => ({
  access: getAccessToken(),
  refresh: getRefreshToken(),
});

export const getCurrentLanguage = (): string => localStorage.getItem(LANGUAGE_KEY) || '';

export const setCurrentLanguage = (language: string): void => localStorage.setItem(LANGUAGE_KEY, language);
