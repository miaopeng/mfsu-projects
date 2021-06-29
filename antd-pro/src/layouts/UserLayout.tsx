import { MenuDataItem, getMenuData, getPageTitle } from '@ant-design/pro-layout';
// import { Helmet, HelmetProvider } from 'react-helmet-async';
import { ConnectProps, connect } from 'umi';
import React from 'react';
import { ConnectState } from '@/models/connect';
import logo from '../assets/hawkeye-blue.svg';
import styles from './UserLayout.less';

export interface UserLayoutProps extends Partial<ConnectProps> {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
}

const UserLayout: React.FC<UserLayoutProps> = (props) => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { breadcrumb } = getMenuData(routes);
  const title = getPageTitle({
    pathname: location.pathname,
    breadcrumb,
    ...props,
  });
  return (
    // <HelmetProvider>
    //   <Helmet>
    //     <title>{title}</title>
    //     <meta name="description" content={title} />
    //   </Helmet>

    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.contentBg} />
        <div style={{ zIndex: 2 }}>
          <div className={styles.top}>
            <div className={styles.header}>
              <img alt="logo" className={styles.logo} src={logo} />
              <div className="flex">
                <div className="mr1">
                  {/* <div className="text-sm text-right color-light">观云</div> */}
                  <div className={styles.title}>GuanYun</div>
                </div>
                <div>
                  {/* <div className="text-sm text-right color-light">好可爱</div> */}
                  <div className={styles.title}>Hawkeye</div>
                </div>
              </div>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
    // </HelmetProvider>
  );
};

export default connect(({ settings }: ConnectState) => ({ ...settings }))(UserLayout);
