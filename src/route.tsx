import lazyLoad from 'libs/lazyLoad';
import { ReactNode } from 'react';

export interface AppRoute {
  name: string;
  path: string;
  component: any;
  suspense?: string;
  exact?: boolean;
  disableLayout?: boolean;
  icon?: ReactNode;
  label?: string;
  withNavigation?: boolean;
  children?: AppRoute[];
}

export const routes: AppRoute[] = [
  {
    name: 'main',
    path: '/',
    component: lazyLoad('main', 'MainPage'),
    suspense: 'medium-vertical-fluid',
    exact: true,
    label: 'main',
    withNavigation: true,
  },
];
