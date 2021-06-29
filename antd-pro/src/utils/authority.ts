import persist from '@/utils/persist';
import { reloadAuthorized } from './Authorized';

export function getAuthority(str?: string): string[] {
  const auth = typeof str === 'undefined' ? persist.auth : str;
  // authorityString could be admin, "admin", ["admin"]
  return ([] as string[]).concat(auth);
}

export function setAuthority(authority: string | string[]): void {
  persist.auth = authority;
  // auto reload
  reloadAuthorized();
}
