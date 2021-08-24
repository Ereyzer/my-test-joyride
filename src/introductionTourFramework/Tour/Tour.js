import React, { useEffect, useContext } from 'react';
import JoyRide from '../../components';
import controlBtnsOnOfContext from '../helpers/context';
import { ACTIONS, EVENTS, STATUS } from '../../constants';

const Tour = () => {
  const ctx = useContext(controlBtnsOnOfContext);

  useEffect(() => {
    if (!localStorage.getItem('tour')) {
      ctx.dispatchTourState({ type: 'START' });
    }
  }, []);

  const callback = data => {
    const { action, index, type, status } = data;

    if (
      action === ACTIONS.CLOSE ||
      (status === STATUS.SKIPPED && ctx.tourState.run) ||
      status === STATUS.FINISHED
    ) {
      ctx.dispatchTourState({ type: 'STOP', steps: [] });
      const oldLocaleStorage = JSON.parse(localStorage.getItem('shownElements'))
        ? JSON.parse(localStorage.getItem('shownElements'))
        : [];
      localStorage.setItem(
        'shownElements',
        JSON.stringify([...oldLocaleStorage, ...ctx.tourState.steps.map(({ id }) => id)]),
      );
      ctx.seShownElements(JSON.parse(localStorage.getItem('shownElements')));
    } else if (type === EVENTS.STEP_AFTER || type === EVENTS.TARGET_NOT_FOUND) {
      ctx.dispatchTourState({
        type: 'NEXT_OR_PREV',
        payload: { stepIndex: index + (action === ACTIONS.PREV ? -1 : 1) },
      });
    }
  };

  return (
    <>
      <JoyRide
        {...ctx.tourState}
        callback={callback}
        showSkipButton={true}
        showProgress={true}
        styles={{
          tooltipContainer: {
            textAlign: 'left',
          },
          buttonNext: {
            backgroundColor: 'rgba(0, 139, 139, 0.845)',
            color: 'bisque',
          },
          buttonBack: {
            marginRight: 10,
          },
          beacon: {
            position: 'fixed',
            top: '0',
            left: '20px',
            fill: 'rgba(0, 139, 139, 0.845)',
          },
          buttonClose: {
            color: 'red',
          },
          buttonSkip: {
            backgroundColor: 'bisque',
            color: 'rgb(0, 139, 139)',
          },
        }}
        locale={{
          last: 'End tour',
          skip: 'Close tour',
        }}
      />
    </>
  );
};

export default Tour;
