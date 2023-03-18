import React from 'react';
import PropTypes from 'prop-types';

function TextMessage({ message, user }) {
  const className = (user === message.user
    ? 'text-message text-message-user'
    : 'text-message text-message-other'
  );
  return (
    <div className={className}>
      {message.text}
    </div>
  );
}

export default TextMessage;

TextMessage.propTypes = {
  text: PropTypes.instanceOf(Object),
  user: PropTypes.string,
};
