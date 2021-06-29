import { IS_PROD } from '@/utils/constants';
import persist from '@/utils/persist';

// const fundebug = require('fundebug-javascript');

const { user } = persist;

// fundebug.init({
//   apikey: '1b484280d738f630e4b52ce1ed42667f6b54324b88fc3b0c873b1fc3adf97e6e',
//   filters: [{ message: /^Script error\.$/ }, { message: /^ResizeObserver loop limit exceeded$/ }],
// });

export const reportError = (error: any, info: any) => {
  if (IS_PROD) {
    // fundebug.notifyError(error, {
    //   metaData: {
    //     user,
    //     info,
    //   },
    // });
  }
};
