import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import controlBtnsOnOfContext from '../helpers/context';
import Button from '../Button/Button';
import ListElement from '../ListElement/ListElement';

import s from './ModalMain.module.css';

const ModalMain = () => {
  const context = useContext(controlBtnsOnOfContext);

  const onFinishClick = () => {
    context.apiService.postElements(context.elements);
    context.dispatchModal({ type: 'off' });
    context.dispatchButton({ type: 'off' });
  };
  const onStartCLick = () => {
    context.dispatchModal({ type: 'off' });
    context.dispatchButton({ type: 'on' });
  };

  return createPortal(
    <div className={s.Modal}>
      <Button onClick={onStartCLick}>Start</Button>
      <Button onClick={onFinishClick}>Finish</Button>
      {context?.elements?.length > 0 && <ListElement />}
    </div>,
    document.getElementById('tour-buttons-container'),
  );
};

ModalMain.propTypes = {
  dispatchButton: PropTypes.func.isRequired,
  dispatchModal: PropTypes.func.isRequired,
};

export default ModalMain;
