import React from 'react';
import propTypes from 'prop-types';

function TextField({ label, id, onChange, type }) {
  return (
    <div className="text-field-wrapper">
      <label className="text-field-label" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        className="text-field-input"
        onChange={onChange}
        type={type}
      />
    </div>
  );
}

export default TextField;

TextField.propTypes = {
  label: propTypes.string.isRequired,
  id: propTypes.string.isRequired,
  onChange: propTypes.func,
  type: propTypes.string,
};

TextField.defaultProps = {
  onChange: () => {},
  type: 'text',
};
