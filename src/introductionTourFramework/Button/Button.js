import React from 'react';
import PropTypes from 'prop-types';

// import s from './Button.module.css';
const styles = {
  Button: {
    minWidth: '200px',
    padding: '8px 15px',
    border: '2px solid #ccc',
    background: '#000',
    color: '#aaa',
    borderRadius: '5px',
    fontSize: '20px',
    margin: '15px',
    transition: 'all 400ms ease-out',
  },
  'Button:hover': {
    textShadow: '#fff -1px -1px 1px, #fff 1px 1px 1px',
    letterSpacing: '2px',
  },
};

const Button = ({ children, onClick, id }) => (
  <button id={id || ''} className={styles.Button} type="button" onClick={onClick}>
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.element,
  id: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default Button;
