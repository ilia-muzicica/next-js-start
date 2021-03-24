import React from 'react';
import { Redirect as OldRedirect } from 'react-router-dom';
import { getRoute } from '../';

type Params = { [key: string]: any };

interface Props {
  from?: string;
  to?: string;

  fromRoute?: string;
  fromParams?: Params;
  toRoute?: string;
  toParams?: Params;
}

export const Redirect: React.FC<Props> = ({ from, to, fromRoute, toRoute, fromParams, toParams, ...props }) => (
  <OldRedirect
    {...props}
    {...(fromRoute || from ? (fromRoute ? getRoute(fromRoute, fromParams) : from) : {})}
    to={toRoute ? getRoute(toRoute, toParams) || '' : to || ''}
  />
);
