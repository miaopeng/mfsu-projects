/* eslint-disable jsx-a11y/accessible-emoji */

import React from 'react';
import { Button, Dropdown, Tag } from 'antd';
import { connect, Link, ConnectProps } from 'umi';
import { ConnectState, NotificationModelState } from '@/models/connect';
import { BellOutlined } from '@ant-design/icons';
import { canI, permissions } from '@/security/permissions';
import styles from './index.less';

const { HandleStockWarning } = permissions;

interface P extends Partial<ConnectProps> {
  notification: NotificationModelState;
}

const Notification: React.FC<P> = (props) => {
  const { dispatch, notification } = props;
  const birthdayDealers = notification.birthdayUpcomingDealers;
  const { variantWarnings } = notification;

  const menu = (
    <div className={styles.messageBox}>
      <div className="hd">
        {birthdayDealers.length ? (
          <>
            <span className="mr1">🎂</span>
            <span>有 {birthdayDealers.length} 位客户要过生日了！</span>
          </>
        ) : (
          <span>没有消息通知</span>
        )}
      </div>
      <ul>
        {birthdayDealers.map((item: any) => {
          return (
            <li key={item.id} className="text-sm">
              <div>
                <Link to={`/dealers/${item.id}`}>{item.name}</Link>
              </div>
              <div style={{ color: '#999' }} className="flex space-between">
                <span>{item.principal.name}</span>
                <span>生日：{item.principal.birthday}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );

  const renderWarningStatus = (variant: any) => {
    const btn = (
      <Button type="link" size="small" style={{ fontSize: 12 }}>
        去处理
      </Button>
    );

    let status;

    switch (variant.warningStatus) {
      case 'idle':
        status = canI(HandleStockWarning) ? btn : null;
        break;
      case 'inProcess':
        status = <Tag color="green">已在处理</Tag>;
        break;
      default:
        break;
    }
    return status;
  };

  const warningMenu = (
    <div className={styles.messageBox}>
      <div className="hd">
        <span>有 {variantWarnings.length} 个产品库存紧张！</span>
      </div>
      <ul>
        {variantWarnings.map((item: any) => {
          return (
            <li key={item.id} className="text-sm">
              <div>
                <Link to={`/dealers/${item.id}`}>{item.name}</Link>
              </div>
              <div style={{ color: '#f50' }} className="flex space-between items-center">
                <span>
                  {item.displayTitle} 库存仅剩 {item.inventoryQuantity}
                </span>
                {renderWarningStatus(item)}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );

  const handleClickNotification = () => {
    if (dispatch) {
      dispatch({ type: 'notification/markAllAsRead' });
    }
  };

  return (
    <>
      {variantWarnings.length ? (
        <Dropdown overlay={warningMenu} trigger={['click']} placement="bottomRight">
          <div className="relative linkmate mr1">
            <Tag color="#f50" style={{ cursor: 'pointer' }}>
              库存紧张!
            </Tag>
          </div>
        </Dropdown>
      ) : null}
      {birthdayDealers.length ? (
        <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
          <div className="relative linkmate mr1" onClick={() => handleClickNotification()}>
            <BellOutlined />
            <div>{notification.hasUnread && <div className={styles.messageDot} />}</div>
          </div>
        </Dropdown>
      ) : null}
    </>
  );
};

export default connect(({ notification }: ConnectState) => ({
  notification,
}))(Notification);
