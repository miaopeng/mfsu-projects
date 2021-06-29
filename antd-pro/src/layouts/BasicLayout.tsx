import ProLayout, {
  MenuDataItem,
  BasicLayoutProps as ProLayoutProps,
  Settings,
} from '@ant-design/pro-layout';
import React, { useEffect } from 'react';
import { Link, connect, Dispatch, history } from 'umi';
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';
import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import { ConnectState } from '@/models/connect';
import { getAuthorityFromRouter } from '@/utils/utils';
import { Page403 } from '@/components/Exception';
import IconMap from './IconMap';
import './BasicLayout.less';

export interface BasicLayoutProps extends ProLayoutProps {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
  route: ProLayoutProps['route'] & {
    authority: string[];
  };
  settings: Settings;
  dispatch: Dispatch;
  globalError: any;
}
export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
};

/**
 * use Authorized check all menu item
 * 根据路由配置及当前权限，返回当前权限可显示的菜单数据
 */

const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] =>
  menuList.map((item) => {
    const localItem = { ...item, children: item.children ? menuDataRender(item.children) : [] };
    return Authorized.check(item.authority, localItem, null) as MenuDataItem;
  });

const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
  const {
    dispatch,
    children,
    globalError,
    settings,
    location = {
      pathname: '/',
    },
  } = props;

  /**
   * constructor
   */

  if (globalError) {
    throw globalError;
  }

  useEffect(() => {
    if (dispatch) {
      dispatch({ type: 'user/fetchCurrent' });
      dispatch({ type: 'notification/fetch' });
    }
  }, []);

  /**
   * init variables
   */

  const handleMenuCollapse = (payload: boolean): void => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  }; // get children authority

  const authorized = getAuthorityFromRouter(props.route.routes, location.pathname || '/') || {
    authority: undefined,
  };

  const logo = (
    <img
      onClick={() => history.push('/')}
      srcSet={`${require('@/assets/logo.png')}, ${require('@/assets/logo@2x.png')} 2x, ${require('@/assets/logo@3x.png')} 3x`}
      src={require('@/assets/logo.png')}
      alt="Guanyun Hawkeye"
    />
  );

  return (
    <>
      <ConfigProvider locale={zhCN}>
        <ProLayout
          logo={logo}
          siderWidth={210}
          menuHeaderRender={(logoDom) => logoDom}
          onCollapse={handleMenuCollapse}
          menuItemRender={(menuItemProps) => {
            const { iconName, name, path } = menuItemProps;
            const icon = IconMap[iconName] || null;
            const menuItem = (
              <>
                {icon}
                <span>{name}</span>{' '}
              </>
            );
            if (!path) {
              return menuItem;
            }
            return (
              <div className="ant-menu-submenu-title">
                <Link to={path}>{menuItem}</Link>
              </div>
            );
          }}
          breadcrumbRender={(routers = []) => routers}
          itemRender={(route, params, routes) => {
            const first = routes.indexOf(route) === 0;
            return first ? (
              <Link to={route.path}>{route.breadcrumbName}</Link>
            ) : (
              <span>{route.breadcrumbName}</span>
            );
          }}
          footerRender={() => null}
          menuDataRender={menuDataRender}
          rightContentRender={() => <RightContent />}
          {...props}
          {...settings}
        >
          <Authorized authority={authorized!.authority} noMatch={<Page403 />}>
            {children}
          </Authorized>
        </ProLayout>
      </ConfigProvider>
    </>
  );
};

export default connect(({ global, settings }: ConnectState) => ({
  collapsed: global.collapsed,
  globalError: global.error,
  settings,
}))(BasicLayout);
