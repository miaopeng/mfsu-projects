import React from 'react';
import styles from './collapse.less';

const CollapseIcon = (props: any) => {
  const { open = false } = props;
  const cls = [styles.buttonCollapse, open ? styles.open : ''].join(' ');

  return (
    <svg width="18" height="18" className={cls}>
      <g fill="none" fillRule="evenodd">
        <path stroke="currentColor" d="M4.5 4.5l9 9" strokeLinecap="round" />
        <path stroke="currentColor" d="M13.5 4.5l-9 9" strokeLinecap="round" />
      </g>
    </svg>
  );
};

export default CollapseIcon;
