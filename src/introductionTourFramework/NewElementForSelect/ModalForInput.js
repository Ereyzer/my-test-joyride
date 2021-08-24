/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { createPortal } from 'react-dom';

const styles = {
  Backdrop: {
    position: 'fixed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(75, 82, 139, 0.582)',
  },

  Textarea: {
    padding: '10px 15px',
    outline: 'none',
    borderRadius: '6px',
  },

  'Textarea:not(:placeholder-shown)': {
    border: '1px solid #362f2f',
    boxShadow: '0px 0px 8px 0px #2f2b2b',
  },
};

export function ModalForInput({ addDescription, closeModal }) {
  const [value, setValue] = useState('');
  const handleSubmit = e => {
    e.preventDefault();
    addDescription(value.trim());
    setValue('');
    closeModal(false);
  };
  const backdropClick = e => {
    e.stopPropagation();
  };

  return createPortal(
    <div style={styles.Backdrop} onClick={backdropClick}>
      <form onSubmit={handleSubmit}>
        <textarea
          value={value}
          onChange={e => setValue(e.target.value)}
          style={styles.Textarea}
          cols="50"
          rows="10"
        />
        <button type="submit">add description</button>
      </form>
    </div>,
    document.getElementById('tour-buttons-container'),
  );
}
