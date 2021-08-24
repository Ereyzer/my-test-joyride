import React, { useState, useEffect, useContext } from 'react';
import { createPortal } from 'react-dom';
// import styles from './TourBtns.module.css';
import controlBtnsOnOfContext from '../helpers/context';
import Button from '../Button/Button';

export function TourBtns({ changeIsStartAddElements }) {
  const ctx = useContext(controlBtnsOnOfContext);
  const [status, setStatus] = useState(false);
  const [side, setSide] = useState(false);

  useEffect(() => {
    changeIsStartAddElements(status);
  }, [status]);

  const addSelectItem = () => {
    console.log(ctx.elements);

    ctx.dispatchModal({ type: 'on' });
    ctx.dispatchButton({ type: 'off' });
  };

  return createPortal(
    <div>
      <Button
        onClick={() => setStatus(s => !s)}
        id="switch-work-administrator"
        // className={styles.ButtonStart}
      >
        {status ? 'stop' : 'start'}
      </Button>
      <Button
        onClick={addSelectItem}
        // className={styles.ButtonStart}
        id="add-selected-items"
      >
        add selected items
      </Button>
      <Button onClick={() => setSide(s => !s)}>{side ? '▲' : '▼'}</Button>
    </div>,
    document.getElementById('tour-buttons-container'),
  );
}
