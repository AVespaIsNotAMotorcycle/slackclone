import React from 'react';
import './Common.css';

function Button({ children, onClick, variant }) {
  const classNames = ['button', variant];
  return (
    <div className="button-wrapper">
      <button type="button" className={classNames.join(' ')} onClick={onClick}>
        {children}
      </button>
    </div>
  );
}

export default Button;
