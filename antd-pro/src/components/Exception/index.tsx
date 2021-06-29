import React, { useState } from 'react';
import { Link, getDvaApp } from 'umi';
import { Button } from 'antd';
import './index.less';

interface P {
  title: string;
  img: any;
  caption: string;
  button?: any;
}

const headerStyle = {
  fontSize: '2em',
  fontFamily: "'Saul'",
};

const captionStyle = {
  background: 'black',
  color: '#fff',
  textAlign: 'center' as 'center',
  lineHeight: '2.5rem',
  height: '2.5rem',
  overflow: 'hidden',
};

const Exception = (props: P) => {
  const [loaded, setLoaded] = useState(false);
  const onLoad = () => {
    setLoaded(true);
  };

  const figureStyle = {
    width: '100%',
    maxWidth: 400,
    transition: 'all .4s ease',
    marginLeft: loaded ? 0 : 40,
    opacity: loaded ? 1 : 0,
  };

  const button =
    props.button === false ? null : (
      <Link to="/">
        <Button type="primary">回到首页</Button>
      </Link>
    );

  return (
    <>
      <div className="p2">
        <h1 style={headerStyle}>{props.title}</h1>
        <figure style={figureStyle}>
          <figcaption style={captionStyle} />
          <img src={props.img} alt="" onLoad={onLoad} />
          <figcaption style={captionStyle}>{props.caption}</figcaption>
        </figure>
        {button}
      </div>
    </>
  );
};

export const Page404 = () => (
  <Exception title="404 Not Found" img={require('./404.jpg')} caption="抱歉，没有找到这个页面" />
);

export const Page403 = () => (
  <Exception
    title="403 Forbidden"
    img={require('./403.jpg')}
    caption="抱歉，您没有访问此页面的权限"
  />
);

export const PageClientError = () => (
  <Exception
    title="Something went wrong."
    img={require('./error.jpg')}
    caption="抱歉，好像出错了"
  />
);

export const PageNetworkError = () => {
  const [loaded, setLoaded] = useState(false);
  const { global } = getDvaApp()._store.getState();
  const onLoad = () => {
    setLoaded(true);
  };
  const figureStyle = {
    width: '100vw',
    transition: 'all .4s ease',
    marginLeft: loaded ? 0 : 40,
    opacity: loaded ? 1 : 0,
  };
  const title = 'Under maintenance...';
  const img = require('./sys.jpg');
  const caption = '系统正在维护...';
  const hStyle = {
    fontSize: '3rem',
    fontFamily: "'Saul'",
    top: 20,
    left: 20,
    color: '#fdeb04',
  };
  const codeStyle = {
    color: 'antiquewhite',
    padding: 16,
    top: 100,
    left: 20,
  };

  const renderCode = () => {
    const { error } = global;
    if (!error || !error.data) {
      return null;
    }
    const { networkError, operation } = error.data;

    return (
      <>
        <code className="d-block p-md-absolute" style={codeStyle}>
          <strong>{caption}</strong>
          <div>Operation: {operation.operationName}</div>
          <div>StatusCode: {networkError.statusCode}</div>
          <div>Response: {networkError.result.error.message}</div>
        </code>
      </>
    );
  };

  return (
    <div className="overlay" style={{ background: 'black' }}>
      <figure style={figureStyle}>
        <img src={img} alt="" onLoad={onLoad} />
      </figure>
      <h1 className="absolute" style={hStyle}>
        {title}
      </h1>
      {renderCode()}
    </div>
  );
};
