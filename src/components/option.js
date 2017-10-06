import React from 'react';
import PropTypes from 'prop-types';

function optionItem (props) {
  const {text, value, disabled} = props;
  return (
    <option
      value={value}
      disabled={disabled}
    >{text}
    </option>)
}

optionItem.propTypes = {
  text: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool,
}

export default optionItem;