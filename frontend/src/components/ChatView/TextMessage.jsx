import React from 'react';
import PropTypes from 'prop-types';

function TextMessage({ text }) {
  return (
    <div className="text-message">
      {text}
    </div>
  );
}

export default TextMessage;

TextMessage.propTypes = {
  text: PropTypes.string.isRequired,
};
