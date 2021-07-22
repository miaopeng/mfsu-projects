import { pathToRegexp } from 'path-to-regexp';
import { getAuthority } from './authority';
import persist from './persist';

export const isAdmin = () => {
  const roles: string[] = getAuthority();
  if (!roles || !roles.length || !roles.includes('admin')) {
    return false;
  }
  return true;
};

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg =
  /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

/**
 * 从路由配置和指定路径中获取该路径的 authority 对象
 * @param router [{}] 路由配置
 * @param pathname string 路径
 */
export const getAuthorityFromRouter = <T>(router: T[] = [], pathname: string): T | undefined => {
  const authority = router.find(
    ({ routes, path = '/' }: any) =>
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
export const getRouteAuthority = (path: string, routeData: any) => {
  let authorities: string[] | string | undefined;
  routeData.forEach((route: any) => {
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
