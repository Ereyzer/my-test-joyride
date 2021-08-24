import React, { useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import controlBtnsOnOfContext from '../helpers/context';

const styles = {
  NewDomBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
  },
};

function createMarkup(text) {
  return { __html: text };
}

export function NewDom({ reference }) {
  const ctx = useContext(controlBtnsOnOfContext);
  const newDomRef = useRef(null);

  const selectElement = e => {
    e.stopPropagation();
    e.preventDefault();
    if (ctx.isAdminB) return;
    if (!ctx.isStartAddElements) return;

    const element = e.target;

    if (element.id === 'switch-work-administrator' || element.id === 'add-selected-items') return;

    ctx.setPath(e.nativeEvent.path);

    ctx.setIsModalDescription(true);
  };

  return (
    <div
      className={styles.NewDomBackdrop}
      onClick={selectElement}
      ref={newDomRef}
      newdom-attribute="new-dom"
      dangerouslySetInnerHTML={createMarkup(reference.innerHTML)}
    />
  );
}

NewDom.propTypes = {
  reference: PropTypes.any.isRequired,
};
