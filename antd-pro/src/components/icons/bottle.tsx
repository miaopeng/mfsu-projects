import React from 'react';

const style = {
  lineHeight: 0,
  minWidth: 14,
  fontSize: 14,
};
const Bottle = (props: any) => (
  <>
    <span style={style} {...props}>
      <svg
        width="1em"
        height="1em"
        viewBox="64 64 896 896"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="477"
          y="85"
          width="391"
          height="854"
          opacity=".6"
          stroke="currentColor"
          strokeWidth="36"
        />
        <line x1="736" y1="157" x2="736" y2="339" stroke="white" strokeWidth="100" />
        <mask id="path-4-inside-1" fill="white">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M381 159H260V358.253L148.83 359.832C142.269 359.925 137 365.27 137 371.831V943C137 949.627 142.373 955 149 955H477C483.627 955 489 949.627 489 943V371.831C489 365.27 483.731 359.925 477.17 359.832L381 358.466V159Z"
          />
        </mask>
        <path
          d="M260 159V123H224V159H260ZM381 159H417V123H381V159ZM260 358.253L260.511 394.249L296 393.745V358.253H260ZM148.83 359.832L149.341 395.828L149.341 395.828L148.83 359.832ZM477.17 359.832L476.659 395.828L476.659 395.828L477.17 359.832ZM381 358.466H345V393.958L380.489 394.462L381 358.466ZM260 195H381V123H260V195ZM296 358.253V159H224V358.253H296ZM149.341 395.828L260.511 394.249L259.489 322.256L148.318 323.836L149.341 395.828ZM173 371.831C173 384.953 162.461 395.642 149.341 395.828L148.318 323.836C122.077 324.208 101 345.587 101 371.831H173ZM173 943V371.831H101V943H173ZM149 919C162.255 919 173 929.745 173 943H101C101 969.51 122.49 991 149 991V919ZM477 919H149V991H477V919ZM453 943C453 929.745 463.745 919 477 919V991C503.51 991 525 969.51 525 943H453ZM453 371.831V943H525V371.831H453ZM476.659 395.828C463.539 395.642 453 384.953 453 371.831H525C525 345.587 503.923 324.208 477.682 323.836L476.659 395.828ZM380.489 394.462L476.659 395.828L477.682 323.836L381.511 322.47L380.489 394.462ZM345 159V358.466H417V159H345Z"
          fill="currentColor"
          mask="url(#path-4-inside-1)"
        />
        <line x1="383" y1="446" x2="383" y2="538" stroke="currentColor" strokeWidth="36" />
      </svg>
    </span>
  </>
);
export default Bottle;
