import React, { useContext } from 'react';

import controlBtnsOnOfContext from '../helpers/context';
// import s from './ListElement.module.css';

const ListElement = () => {
  const context = useContext(controlBtnsOnOfContext);

  return (
    <ul>
      {context.elements.map(({ description, _id }) => (
        <li
          // className={s.Item}
          key={_id || description}
        >
          <p>{description}:</p>
          <button
            // className={s.Button}
            onClick={() => {
              context.apiService.delElement(_id);
              context.setElements(s => s.filter(e => e._id !== _id));
            }}
            type="button"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ListElement;
