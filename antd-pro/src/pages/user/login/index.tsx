import { Alert } from 'antd';
import React from 'react';
import { Dispatch, AnyAction } from 'redux';
import { connect } from 'dva';
import { StateType } from './model';
import styles from './style.less';
import { LoginParamsType } from './service';
import LoginFrom from './components/Login';

const { UserName, Password, Submit } = LoginFrom;

interface LoginProps {
  dispatch: Dispatch<AnyAction>;
  userAndlogin: StateType;
  submitting?: boolean;
}

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login: React.FC<LoginProps> = (props) => {
  const { userAndlogin = {}, submitting } = props;
  const { status, errorMessage } = userAndlogin;

  const handleSubmit = (values: LoginParamsType) => {
    const { dispatch } = props;
    dispatch({
      type: 'userAndlogin/login',
      payload: {
        ...values,
      },
    });
  };

  return (
    <div className={styles.main}>
      {/* <div>Login</div> */}
      <LoginFrom onSubmit={handleSubmit}>
        <UserName name="userName" rules={[{ required: true, message: '请输入您的手机号!' }]} />
        <Password name="password" rules={[{ required: true, message: '请输入密码！' }]} />
        <div>
          {status === 'error' && !submitting && errorMessage && (
            <LoginMessage content={errorMessage} />
          )}
        </div>
        <Submit loading={submitting} disabled={submitting}>
          登录
        </Submit>
      </LoginFrom>
    </div>
  );
};

export default connect(
  ({
    userAndlogin,
    loading,
  }: {
    userAndlogin: StateType;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    userAndlogin,
    submitting: loading.effects['userAndlogin/login'],
  }),
)(Login);
