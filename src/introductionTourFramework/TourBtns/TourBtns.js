import React, { useState, useEffect, useContext } from 'react';
import { createPortal } from 'react-dom';
import controlBtnsOnOfContext from '../helpers/context';
import Button from '../Button/Button';

const ButtonStart = {
  position: 'fixed',
  display: 'flex',
};
const styles = {
  BlockTop: {
    ...ButtonStart,
    top: '20px',
    left: '20px',
  },

  BlockBottom: {
    ...ButtonStart,
    bottom: '20px',
    left: '20px',
  },
};

export function TourBtns({ changeIsStartAddElements }) {
  const ctx = useContext(controlBtnsOnOfContext);
  const [status, setStatus] = useState(false);
  const [side, setSide] = useState(false);

  useEffect(() => {
    changeIsStartAddElements(status);
  }, [status]);

  const addSelectItem = () => {
    ctx.dispatchModal({ type: 'on' });
    ctx.dispatchButton({ type: 'off' });
  };

  return createPortal(
    <div className={styles[`${side ? 'BlockBottom' : 'BlockTop'}`]}>
      <Button onClick={() => setStatus(s => !s)} id="switch-work-administrator">
        {status ? 'stop' : 'start'}
      </Button>
      <Button onClick={addSelectItem} id="add-selected-items">
        add selected items
      </Button>
      <Button onClick={() => setSide(s => !s)}>{side ? '▲' : '▼'}</Button>
    </div>,
    document.getElementById('tour-buttons-container'),
  );
}
