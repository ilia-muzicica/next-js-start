import { AppRoute, routes } from 'route';
import { match } from 'react-router-dom';
import { parseObject } from 'libs/url';

export type Params = { [key: string]: any };

export const getRoute = (name: string, params?: Params): string => {
  const route = routes
    .reduce<AppRoute[]>((accum: AppRoute[], current: AppRoute) => {
      return current.children && current.children.length ? [...accum, ...current.children] : [...accum, current];
    }, [])
    .find(item => item.name === name);
  // const route = routes.find(item => item.name === name);

  if (route) {
    let { path } = Object.assign({}, route);

    params && Object.keys(params).map(key => (path = path.replace(`:${key}`, params[key])));

    return params && params.query ? `${path}${parseObject(params.query)}` : path;
  }

  return '';
};

export const getRouteByPath = (path: string): string => {
  const { name } =
    routes
      .reduce<AppRoute[]>((accum: AppRoute[], current: AppRoute) => {
        return current.children && current.children.length ? [...accum, ...current.children] : [...accum, current];
      }, [])
      .find(item => item.path === path) || {};

  return name || '';
};

export const getParentByPath = (path: string): string => {
  const { name } =
    routes.find(
      item => item.children && item.children.length && item.children.find(subitem => subitem.path === path),
    ) || {};

  return name || '';
};

export const getPath = (name: string): string => {
  const { path } =
    routes
      .reduce<AppRoute[]>((accum: AppRoute[], current: AppRoute) => {
        return current.children && current.children.length ? [...accum, ...current.children] : [...accum, current];
      }, [])
      .find(item => item.name === name) || {};

  return path || '';
};

export const isExactRouteActive = (routeUrl: string, urls: string[] | string): boolean => {
  if (Array.isArray(urls)) {
    return urls.filter(url => routeUrl === url).length > 0;
  }

  return routeUrl === urls;
};

export const isRouteActive = ({ url, params }: match, urls: string | string[], defaultParams?: Params): boolean => {
  if (Array.isArray(urls)) {
    return urls.filter(routeUrl => url === getRoute(routeUrl, { ...params, ...defaultParams })).length > 0;
  }

  return url === getRoute(urls, { ...params, ...defaultParams });
};
