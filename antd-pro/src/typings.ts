import { ORDER_STATUS } from '@/utils/constants';
import {
  Account,
  AccountInput,
  Address,
  Advertiser,
  Category,
  Dashboard,
  Dealer,
  DealerInput,
  ExpensePage,
  InStore,
  InventoryItem,
  InventoryLog,
  OfflineReport,
  OnlineReport,
  Order,
  OutStore,
  Principal,
  Product,
  RawProduct,
  Shipment,
  Shop,
  ShopLineItem,
  ShopOrder,
  Storage,
  Terminal,
  User,
  Variant,
  WorkOrder,
} from '@/generated/graphql';

export { DealerType as DealerTypeEnum } from '@/generated/graphql';

export interface IStorage extends Storage {}
export interface IRawProduct extends RawProduct {}
export interface IWorkOrder extends WorkOrder {}

export interface IPageInputs {
  page?: number;
  perPage?: number;
}

export interface IDeletable {
  _destroy?: boolean;
}

export interface IAddress extends Address {}

export interface IShippingAddress extends IAddress {
  name: string;
  phone: string;
}

export interface IModal {
  visible: boolean;
  data?: any;
  [key: string]: any;
}

export interface IAddressInput extends IAddress {}

export interface IAccount extends Account {}

export interface IAccountInput extends AccountInput {}

export interface IAdvertiser extends Advertiser {}

export interface IDashboard extends Dashboard {}

export interface IPrincipal extends Principal {}

export interface IUser extends User {}

export interface IDealer extends Dealer {}

export interface DealerListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface IDealerInput extends DealerInput {}

export interface DealerListData {
  list: IDealer[];
  pagination: Partial<DealerListPagination>;
}

export interface DealerListParams {
  sorter?: string;
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
}

export interface ITerminal extends Terminal {}

export interface ITerminalRecord {
  id: string;
  name: string;
  phone?: string;
  contact?: string;
  address: IAddressInput;
  terminalType: string;
}

export interface ITerminalInput extends ITerminalRecord {
  dealerId?: string;
}

export interface IVariant extends Variant {}

export interface IProduct extends Product {}

export interface CartItem {
  variant: IVariant;
  count: number;
}

export interface ILineItem {
  id: string;
  price: number;
  totalPrice: number;
  variantId: string;
  quantity: number;
  variant: IVariant;
}

export interface IShop extends Shop {}
export interface IShopLineItem extends ShopLineItem {}
export interface IShopOrder extends ShopOrder {}

export interface IOrder extends Order {
  state: ORDER_STATUS;
}
export interface IShipment extends Shipment {}

export interface IOnlineReport extends OnlineReport {}
export interface IOfflineReport extends OfflineReport {}
export interface IInventoryItem extends InventoryItem {}
export interface IInventoryLog extends InventoryLog {}
export interface IOutStore extends OutStore {}
export interface IInStore extends InStore {}
export interface ICategroy extends Category {}
export interface IExpensePage extends ExpensePage {}
