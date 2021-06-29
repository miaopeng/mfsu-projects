import { history } from 'umi';
import { getAuthority } from '@/utils/authority';

const Welcome = () => {
  const roles = getAuthority();
  const isAdmin = roles.includes('admin');
  const isOperation = roles.includes('operation');
  const isWarehouseManager = roles.includes('warehouse_manager');
  let home = isAdmin || isOperation ? '/dashboard' : '/dealers';
  if (isWarehouseManager) {
    home = '/products';
  }
  history.replace(home);
  return null;
};
export default Welcome;
