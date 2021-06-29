import { DealerTypeEnum } from '@/typings';

export const APP_NAME = 'hawkeye';
export const IS_PROD = process.env.NODE_ENV === 'production';
export const IS_DEV = process.env.NODE_ENV === 'development';
export const TSLA_HOST = IS_PROD ? 'https://guanyun.cn' : 'http://localhost:4000';
export const UNAUTHORIZED_ERROR = 'UnauthorizedError';
export const LEVEL_DESC = ['差', '较差', '普通', '重要', '核心'];
export const OFFLINE_EXPENSE_TYPES = ['陈列费', '小型品鉴会', '大型品鉴会', '活动费用'];
export const ONLINE_EXPENSE_TYPES = [
  '站内推广费用',
  '站外推广费用',
  '应用服务费用',
  '平台扣点费用',
  '返现费用',
  '短信充值费用',
  '其他',
];
export const EXPENSE_TYPES = {
  offline: OFFLINE_EXPENSE_TYPES,
  online: ONLINE_EXPENSE_TYPES,
};
export const TERMINAL_TYPES = ['烟酒店', '商超', '其他'];

export const DASHBOARD_IDS = [
  '10149323', // 天猫
  '10276195', // 京东POP
  '11063409', // 醉乐部小程序
  '11107571', // 抖音小店
  '10158735', // 占豪
  '10100468', // 官网
];

export enum ORDER_STATUS {
  pendding = 'pendding',
  approved = 'approved',
  rejected = 'rejected',
  shipped = 'shipped',
  completed = 'completed',
  cancelled = 'cancelled',
}

export const ORDER_STATUS_FLOW = [
  ORDER_STATUS.pendding,
  ORDER_STATUS.approved,
  ORDER_STATUS.shipped,
  ORDER_STATUS.completed,
];

export enum SHOP_USER_ORDER {
  RECENT = 'RECENT',
  ORDERS_COUNT = 'ORDERS_COUNT',
  TOTAL_AMOUNT = 'TOTAL_AMOUNT',
}

export const ORDER_STATUS_NAMES = {
  [ORDER_STATUS.pendding]: '待审核',
  [ORDER_STATUS.approved]: '已审核',
  [ORDER_STATUS.rejected]: '已驳回',
  [ORDER_STATUS.shipped]: '已发货',
  [ORDER_STATUS.completed]: '完成',
  [ORDER_STATUS.cancelled]: '已取消',
};

export enum ACTIVITY_FIELD_TYPES {
  input = '单行文本',
  textarea = '多行文本',
  mobile = '手机号输入框',
  upload = '上传文件',
  address = '地址',
  shipment = '收货信息',
  // select = '选择框',
}

export const DEALER_TYPES = {
  [DealerTypeEnum.Guanyun]: '观云',
  [DealerTypeEnum.Yuanqi]: '元气森林',
};

export enum STORE_ORDER_STATES {
  pendding = 'pendding',
  completed = 'completed',
}

export const OUTSTORE_STATE_NAMES = {
  [STORE_ORDER_STATES.pendding]: '出库中',
  [STORE_ORDER_STATES.completed]: '出库完成',
};
export const INSTORE_STATE_NAMES = {
  [STORE_ORDER_STATES.pendding]: '入库中',
  [STORE_ORDER_STATES.completed]: '入库完成',
};
export enum INVENTORY_CHECK_STATES {
  pendding = 'pendding',
  completed = 'completed',
}
export const INVENTORY_CHECK_STATE_NAMES = {
  [INVENTORY_CHECK_STATES.pendding]: '盘点中',
  [INVENTORY_CHECK_STATES.completed]: '已完成',
};

export const INVENTORY_LOG_TYPES = {
  OutStore: '出库',
  InStore: '入库',
  InventoryCheck: '盘点',
  OrderOut: '销售出库',
};

export enum INSTORE_TYPES {
  production = '生产入库',
  sourcing = '原材料入库',
  returns = '退货入库',
}

// prettier-ignore
// Last month sales multiples by month
export const ONLINE_SALES_BENCHMARK = [
  2, 1, 2,
  2, 2, 2,
  2, 2, 2,
  1, 3, 1
];

export const MATERIAL_CATEGORY_ID = '1';
export const PRODUCT_CATEGORY_ID = '2';
