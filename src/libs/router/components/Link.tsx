import * as React from 'react';
import { Link as BaseLink } from 'react-router-dom';
import { parseObject } from 'libs/url';
import { getRoute } from '../';
import { Params } from '../helpers';
import { MouseEvent } from 'react';

interface Props {
  to?: string;
  route?: string;
  query?: Params;
  params?: Params;
  disabled?: boolean;
  className?: string;
  state?: any;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
}

export const Link: React.FC<Props> = ({
  to,
  route,
  query = {},
  params = {},
  children,
  disabled,
  className = '',
  state,
  onClick,
}) => {
  // prettier-ignore
  const toLinkParam = route ? getRoute(route, params) : to;

  if (disabled) {
    return (
      // eslint-disable-next-line
      <a href="#" className={`disabled-link ${className}`}>
        {children}
      </a>
    );
  }

  return (
    <BaseLink
      to={{
        pathname: `${toLinkParam || ''}${Object.keys(query).length > 0 ? `${parseObject(query)}` : ''}`,
        state,
      }}
      className={className}
      onClick={onClick}
    >
      {children}
    </BaseLink>
  );
};
