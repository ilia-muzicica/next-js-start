export interface Query {
  [key: string]: string | number;
}

export function parseQuery<T>(queryString: string): T | {} {
  if (queryString !== '') {
    const query: any = {};
    const pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');

    let i = 0;
    for (i; i < pairs.length; i += 1) {
      const pair = pairs[i].split('=');

      query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }

    return query;
  }

  return {};
}

export const parseObject = (obj: { [key: string]: any }): string => {
  const str = [];

  // eslint-disable-next-line
  for (const p in obj)
    if (p) {
      str.push(`${encodeURIComponent(p)}=${encodeURIComponent(obj[p]) || ''}`);
    }

  return `${str.length > 0 ? '?' : ''}${str.join('&')}`;
};
