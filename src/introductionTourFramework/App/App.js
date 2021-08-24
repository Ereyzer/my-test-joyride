import React, { useRef, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import controlBtnsOnOfContext from '../helpers/context';
import { ModalForInput } from '../NewElementForSelect/ModalForInput';
import { addElement } from '../helpers/infoelemens/addElement';

function App({ title, children, className, tag }) {
  const ctx = useContext(controlBtnsOnOfContext);
  const backdropRef = useRef(null);
  const addDescription = async text => {
    addElement(ctx.path, text, ctx.setElements);
  };

  useEffect(() => {
    if (!ctx.elements[0]) return;

    // const callback = entries => {
    //   const steps = [];
    //   entries.forEach(entry => {
    //     if (entry.isIntersecting) {
    //       const usageEntry = ctx.elements.filter(({ path }) => {
    //         return entry.target === document.querySelector(path);
    //       });

    //       steps.push({
    //         target: usageEntry[0].path,
    //         content: usageEntry[0].description,
    //         id: usageEntry[0]['_id'],
    //       });
    //       observer.unobserve(entry.target);
    //     }
    //   });
    //   if (steps[0]) {
    //     ctx.dispatchTourState({ type: 'RESTART', steps: steps });
    //   }
    // };

    const options = {
      threshold: 1,
    };

    const observer = new IntersectionObserver(entries => {
      const steps = [];
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const usageEntry = ctx.elements.filter(
            ({ path }) => entry.target === document.querySelector(path),
          );

          steps.push({
            target: usageEntry[0].path,
            content: usageEntry[0].description,
            id: usageEntry[0]._id,
          });
          observer.unobserve(entry.target);
        }
      });
      if (steps[0]) {
        ctx.dispatchTourState({ type: 'RESTART', steps });
      }
    }, options);

    ctx.elements.forEach(el => {
      const element = document.querySelector(el.path);
      const isShownElements = ctx.shownElements?.includes(el._id) ?? false;
      if (element && !isShownElements) {
        observer.observe(element);
      }
    });
  }, [ctx.elements]);

  return React.createElement(
    `${tag}`,
    {
      className,
      'tour-attribute': title,
      ref: backdropRef,
    },
    [
      children,
      ctx.isModalDescription && (
        <ModalForInput addDescription={addDescription} closeModal={ctx.setIsModalDescription} />
      ),
    ],
  );
}

App.defaultProps = {
  children: null,
  className: null,
  tag: 'div',
};

App.propTypes = {
  children: PropTypes.element,
  className: PropTypes.string || PropTypes.object,
  tag: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default App;
