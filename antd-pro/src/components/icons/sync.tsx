import React from 'react';
import { RefreshCw } from 'react-feather';

interface P {
  syncing: boolean;
  onClick: () => void;
  loadingText?: string;
  [key: string]: any;
}

const SyncIcon = ({ syncing, onClick, loadingText = '正在同步...', ...props }: P) => (
  <>
    <div {...props}>
      {syncing ? (
        <a className="text-sm twinkle">{loadingText}</a>
      ) : (
        <a onClick={onClick} className="text-sm">
          <RefreshCw size="14" className="iconmate" />
        </a>
      )}
    </div>
  </>
);
export default SyncIcon;
