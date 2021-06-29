import { getAuthority } from '@/utils/authority';

class Permissions {
  static readonly permissions = {
    // 编辑用户信息
  };

  static canI = (permission: any): boolean => {
    if (!permission) {
      return true;
    }

    const userRoles = getAuthority();
    const { allow: allowedRoles } = permission;

    if (!userRoles || !userRoles.length) {
      return false;
    }
    if (!allowedRoles) {
      return false;
    }
    if (Array.isArray(allowedRoles)) {
      if (!allowedRoles.length) {
        return false;
      }
      return allowedRoles.some((role) => userRoles.includes(role));
    }
    return userRoles.includes(allowedRoles);
  };
}

export const { canI, permissions } = Permissions;
export default Permissions;
