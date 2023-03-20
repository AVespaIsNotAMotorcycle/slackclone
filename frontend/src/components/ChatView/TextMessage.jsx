import React from 'react';
import PropTypes from 'prop-types';

function TextMessage({ message, user }) {
  const className = (user === message.user
    ? 'text-message-container text-message-container-user'
    : 'text-message-container text-message-container-other'
  );
  return (
    <div className={className}>
      <div />
      <div>
        <div className="text-message">
          {message.text}
        </div>
        {message.user}
      </div>
    </div>
  );
}

export default TextMessage;

TextMessage.propTypes = {
  text: PropTypes.instanceOf(Object),
  user: PropTypes.string,
};
