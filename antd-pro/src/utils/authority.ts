import persist from '@/utils/persist';
// import { reloadAuthorized } from './Authorized';

export function getAuthority(str: string = ''): any {
  // debugger;
  console.log('str', str);
  console.log('persist', persist);
  return persist?.auth;
}

export function setAuthority(authority: string | string[]): void {
  persist.auth = authority;
  // auto reload
  // reloadAuthorized();
}
