import React from 'react';
import PropTypes from 'prop-types';

// import s from './Button.module.css';

const Button = ({ children, onClick, id }) => (
  <button
    id={id || ''}
    // className={s.Button}
    type="button"
    onClick={onClick}
  >
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.element,
  id: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default Button;
