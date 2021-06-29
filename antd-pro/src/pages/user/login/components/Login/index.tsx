import { Form } from 'antd';
import React from 'react';
import classNames from 'classnames';
import { FormInstance } from 'antd/es/form';
import LoginItem, { LoginItemProps } from './LoginItem';

import LoginSubmit from './LoginSubmit';
import styles from './index.less';
import { LoginParamsType } from '../../service';

export interface LoginProps {
  activeKey?: string;
  onTabChange?: (key: string) => void;
  style?: React.CSSProperties;
  onSubmit?: (values: LoginParamsType) => void;
  className?: string;
  from?: FormInstance;
}

interface LoginType extends React.FC<LoginProps> {
  Submit: typeof LoginSubmit;
  UserName: React.FunctionComponent<LoginItemProps>;
  Password: React.FunctionComponent<LoginItemProps>;
  Mobile: React.FunctionComponent<LoginItemProps>;
  Captcha: React.FunctionComponent<LoginItemProps>;
}

const Login: LoginType = (props) => {
  const { className } = props;
  return (
    <div className={classNames(className, styles.login)}>
      <Form
        form={props.from}
        onFinish={(values) => {
          if (props.onSubmit) {
            props.onSubmit(values as LoginParamsType);
          }
        }}
      >
        {props.children}
      </Form>
    </div>
  );
};

Login.Submit = LoginSubmit;

Login.UserName = LoginItem.UserName;
Login.Password = LoginItem.Password;
Login.Mobile = LoginItem.Mobile;
Login.Captcha = LoginItem.Captcha;

export default Login;
