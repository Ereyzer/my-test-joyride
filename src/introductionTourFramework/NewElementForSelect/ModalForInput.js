/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
// import styles from './ModalForInput.module.css';

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
    <div
      // className={styles.Backdrop}
      onClick={backdropClick}
    >
      <form onSubmit={handleSubmit}>
        <textarea
          value={value}
          onChange={e => setValue(e.target.value)}
          // className={styles.Textarea}
          cols="50"
          rows="10"
        />
        <button type="submit">add description</button>
      </form>
    </div>,
    document.getElementById('tour-buttons-container'),
  );
}
