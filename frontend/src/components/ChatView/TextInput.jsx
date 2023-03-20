import React, { useState } from 'react';
import PropTypes from 'prop-types';

function TextInput({ channel, onSubmit }) {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    onSubmit(text, channel);
    setText('');
  };

  return (
    <div className="textinput">
      <textarea
        value={text}
        onChange={(e) => { setText(e.target.value); }}
      />
      <button
        onClick={handleSubmit}
        type="button"
      >
        Send
      </button>
    </div>
  );
}

export default TextInput;

TextInput.propTypes = {
  channel: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

TextInput.defaultProps = {
  channel: '',
};
