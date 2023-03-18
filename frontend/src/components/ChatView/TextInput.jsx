import React, { useState } from 'react';
import PropTypes from 'prop-types';

function TextInput({ onSubmit }) {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    console.log(text);
    onSubmit(text);
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
  onSubmit: PropTypes.func.isRequired,
};
