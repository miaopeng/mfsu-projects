import { pathToRegexp } from 'path-to-regexp';
import { Route } from '@/models/connect';
import numeral from 'numeral';
import { getAuthority } from './authority';
import persist from './persist';

numeral.register('locale', 'chs', {
  delimiters: {
    thousands: ',',
    decimal: '.',
  },
  abbreviations: {
    thousand: 'K',
    million: 'M',
    billion: '十亿',
    trillion: '兆',
  },
  ordinal() {
    return '.';
  },
  currency: {
    symbol: '¥',
  },
});
numeral.locale('chs');

export const isAdmin = () => {
  const roles: string[] = getAuthority();
  if (!roles || !roles.length || !roles.includes('admin')) {
    return false;
  }
  return true;
};

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

/**
 * 从路由配置和指定路径中获取该路径的 authority 对象
 * @param router [{}] 路由配置
 * @param pathname string 路径
 */
export const getAuthorityFromRouter = <T extends Route>(
  router: T[] = [],
  pathname: string,
): T | undefined => {
  const authority = router.find(
    ({ routes, path = '/' }) =>
      (path && pathToRegexp(path).exec(pathname)) ||
      (routes && getAuthorityFromRouter(routes, pathname)),
  );
  if (authority) return authority;
  return undefined;
};

/**
 * 记录权限到 localStorage 中并尝试刷新权限
 * 例如每次登录后保存权限
 * @param authority 权限
 */
export function setAuthority(authority: string | string[]) {
  persist.auth = authority;
  // hard code
  // reload Authorized component
  try {
    if ((window as any).reloadAuthorized) {
      (window as any).reloadAuthorized();
    }
  } catch (error) {
    // do not need do anything
  }

  return authority;
}

/**
 * 根据路径和路由信息，返回该路径对应的权限
 * @param path 路径
 * @param routeData 路由
 */
export const getRouteAuthority = (path: string, routeData: Route[]) => {
  let authorities: string[] | string | undefined;
  routeData.forEach((route) => {
    // match prefix
    if (pathToRegexp(`${route.path}/(.*)`).test(`${path}/`)) {
      if (route.authority) {
        authorities = route.authority;
      }
      // exact match
      if (route.path === path) {
        authorities = route.authority || authorities;
      }
      // get children authority recursively
      if (route.routes) {
        authorities = getRouteAuthority(path, route.routes) || authorities;
      }
    }
  });
  return authorities;
};

export const yuan = (val?: number | string) => (val != null ? numeral(val).format('$0,0.00') : '');
export const numberify = (val: number | string) => numeral(val).format('0,0');
export const percent = (val: number | string, fixed: number = 2) =>
  `${Number(+val * 100).toFixed(fixed)}%`;

export const formatDate = (t: string) => {
  const date = new Date(t);
  const pad = (n: number) => (n < 10 ? `0${n}` : n);
  const [y, m, d] = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
  return `${y}-${pad(m)}-${pad(d)}`;
};

export const formatTime = (t: string) => {
  const date = new Date(t);
  const pad = (n: number) => (n < 10 ? `0${n}` : n);
  const [y, m, d] = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
  const [hh, mm] = [date.getHours(), date.getMinutes()];
  return `${y}-${pad(m)}-${pad(d)} ${pad(hh)}:${pad(mm)}`;
};

export const formatMonth = (t: string) => {
  const date = new Date(t);
  const pad = (n: number) => (n < 10 ? `0${n}` : n);
  const [y, m] = [date.getFullYear(), date.getMonth() + 1];
  return `${y}-${pad(m)}`;
};

interface IOriginData {
  [key: string]: number;
}

export const getChartData = (data: IOriginData = {}, type?: string) => {
  return Object.keys(data).map((key) => ({
    name: key,
    value: data[key],
    ...(type && { type }),
  }));
};

export type TChartDateType = 'monthly' | 'weekly' | 'daily';

/**
 * format date string for chart
 * @param str a date string like `xx-yy`
 * @param type
 */
export const formatChartDate = (str: string, type: TChartDateType = 'daily') => {
  const [mm, dd] = str.split('-').map(parseFloat);
  const yy = mm;

  const date = new Date();

  date.setMonth(mm - 1);
  date.setDate(dd);

  const [m, d] = [date.getMonth() + 1, date.getDate()];

  if (type === 'weekly') {
    date.setDate(6 + d);
    const [MM, DD] = [date.getMonth() + 1, date.getDate()];
    return `${m}月${d}日 - ${MM}月${DD}日`;
  }

  if (type === 'monthly') {
    return `20${yy}年${d}月`;
  }
  return `${m}月${d}日`;
};

export const valueRender = (val: number | string, title: string) => {
  if (/(费|单价|成本|金额|销售额)/.test(title)) {
    return yuan(val);
  }
  if (/(率|百分比)$/.test(title)) {
    return `${val}%`;
  }
  if (/(数|量|数量)$/.test(title)) {
    return numberify(val);
  }
  if (/(时间|日期)$/.test(title)) {
    return formatDate(val as string);
  }
  if (/(备注)$/.test(title)) {
    return val || '';
  }
  if (val == null) return '';
  return val;
};

export const Columns = {
  auto(columns: any[]) {
    return columns.map((c: any) => {
      if (c.render || !c.title) return c;

      return {
        ...c,
        render: (val: number | string) => valueRender(val, c.title),
      };
    });
  },
};

export const wait = (second = 3) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, second * 1000);
  });
};
