import { getAuthority } from '@/utils/authority';
import Roles from './roles';

const roles = Roles.values;

class Permissions {
  static readonly permissions = {
    // 编辑用户信息
    EditUser: {
      allow: [roles.SA],
    },
    // 查看利润和成本
    ReadProfit: {
      allow: [roles.SA, roles.Finance],
    },
    // 查看产品价
    ReadPrice: {
      allow: [roles.SA, roles.Admin],
    },
    // 编辑产品价格
    EditPrice: {
      allow: [roles.SA, roles.Admin],
    },
    // 查看产品成本价
    ReadCost: {
      allow: [roles.SA, roles.Finance],
    },
    // 编辑产品成本价
    EditCost: {
      allow: [roles.SA, roles.Finance],
    },
    // 管理调酒
    ManageBlender: {
      allow: [roles.Producer],
    },
    // 处理库存警告
    HandleStockWarning: {
      allow: [roles.SA, roles.WarehouseManager],
    },
    // 编辑规格
    EditVariant: {
      allow: [roles.SA, roles.Admin],
    },
    // 库存盘点
    CheckInventory: {
      allow: [roles.SA, roles.Admin, roles.WarehouseAdmin],
    },
    // 出/入库单完成确认
    ConfirmStoreIO: {
      allow: [roles.SA, roles.Admin, roles.WarehouseAdmin],
    },
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
