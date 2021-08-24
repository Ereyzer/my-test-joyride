import React, { useState, useRef, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { TourBtns } from '../TourBtns/TourBtns';
import controlBtnsOnOfContext from '../helpers/context';
import ApiService from '../helpers/work-with-bakend';
import ModalMain from '../ModalMain/ModalMain';
import { NewDom } from '../NewDom/NewDom';
import Tour from '../Tour/Tour';

const INITIAL_STATE = {
  key: new Date(),
  run: false,
  continuous: true,
  loading: false,
  stepIndex: 0,
  steps: [],
};

function reducer(state, action) {
  // console.log('state', state);
  switch (action.type) {
    case 'on':
      return true;
    case 'off':
      return false;
    default:
      throw new Error();
  }
}

const reducerStepsTour = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'NEW':
      return {};
    case 'START':
      return { ...state, run: true };
    case 'RESET':
      return { ...state, stepIndex: 0 };
    case 'STOP':
      return { ...state, run: false, steps: [] };
    case 'NEXT_OR_PREV':
      return { ...state, ...action.payload };
    case 'RESTART':
      return {
        ...state,
        stepIndex: 0,
        run: true,
        loading: false,
        key: new Date(),
        steps: [...action.steps],
      };
    default:
      return state;
  }
};

function runOnKeys(func, ...codes) {
  const pressed = new Set();

  document.addEventListener('keydown', function (event) {
    pressed.add(event.code);

    for (const code of codes) {
      // все ли клавиши из набора нажаты?
      if (!pressed.has(code)) {
        return;
      }
    }

    pressed.clear();

    // dispatchModal();
    func({ type: 'on' });
  });

  document.addEventListener('keyup', function (event) {
    pressed.delete(event.code);
  });
}

function TourBackdrop({ className, children, config }) {
  const apiService = new ApiService(config);

  const [isStartAddElements, setIsStartAddElements] = useState(false);
  const [elements, setElements] = useState([]);
  const [isAdminM, dispatchModal] = useReducer(reducer, false);
  const [isAdminB, dispatchButton] = useReducer(reducer, false);
  const [isModalDescription, setIsModalDescription] = useState(false);
  const [path, setPath] = useState('');
  const backdropRef = useRef(null);
  const [tourState, dispatchTourState] = useReducer(reducerStepsTour, INITIAL_STATE);
  // console.log('tourState.steps', tourState.steps);
  const [shownElements, seShownElements] = useState(() =>
    JSON.parse(localStorage.getItem('shownElements')),
  );

  // console.log(isAdminM);

  useEffect(() => {
    runOnKeys(dispatchModal, 'KeyL', 'KeyS', 'KeyD');

    apiService.getElements().then(r => {
      setElements(s => [...s, ...r.data]);
      return r.data;
    });
  }, []);
  return (
    <controlBtnsOnOfContext.Provider
      value={{
        isStartAddElements,
        apiService,
        elements,
        setElements,
        dispatchModal,
        dispatchButton,
        reducer,
        path,
        setPath,
        isModalDescription,
        setIsModalDescription,
        shownElements,
        seShownElements,
        tourState,
        dispatchTourState,
      }}
    >
      <div className={className} ref={backdropRef}>
        {children}
        {!isAdminM && !isAdminB && tourState?.steps[0] && <Tour />}
        {isAdminB && <TourBtns changeIsStartAddElements={setIsStartAddElements} />}
      </div>

      {isAdminM && <ModalMain dispatchModal={dispatchModal} dispatchButton={dispatchButton} />}
      {backdropRef.current && isAdminB && isStartAddElements && (
        <NewDom reference={backdropRef.current} />
      )}
    </controlBtnsOnOfContext.Provider>
  );
}

TourBackdrop.defaultProps = {
  className: null,
};

TourBackdrop.propTypes = {
  children: PropTypes.element,
  className: PropTypes.string,
  config: PropTypes.object,
};

export default TourBackdrop;
