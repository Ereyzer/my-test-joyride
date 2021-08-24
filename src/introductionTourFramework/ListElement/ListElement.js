import React, { useContext } from 'react';
import controlBtnsOnOfContext from '../helpers/context';

const styles = {
  Text: {
    textShadow: '#fff -1px -1px 1px, #fff 1px 1px 1px',
    fontSize: '30px',
    fontWeight: 900,
    padding: '10px',
  },

  List: {
    padding: '30px',
    maxWidth: '600px',
  },

  Item: {
    display: 'flex',
    alignItems: 'center',
    minHeight: '26px',
    maxWidth: '80%',
    position: 'relative',
    marginBottom: '5px',
    padding: '5px 150px 5px 25px',
    background: '#76c761',
    color: '#fff',
    textShadow: '#fc0 1px 0 10px',
    textTransform: 'capitalize',
  },

  'Item:before': {
    position: 'absolute',
    padding: '10px 0',
    top: 0,
    bottom: 0,
    left: '-27px',
    width: '30px',
    background: '#40852e',
    borderBottomLeftRadius: '70em',
    borderTopLeftRadius: '70em',
    counterIncrement: 'li',
    content: ' ',
  },

  Description: {
    display: 'inline-block',
    margin: 0,
    fontSize: '12px',
  },

  Button: {
    position: 'absolute',
    top: '50%',
    right: '20px',
    transform: 'translateY(-50%)',
    padding: '5px 15px 5px 20px',
    cursor: 'pointer',
    border: '1px solid #40852e',
    outline: 'none',
    color: '#40852e',
    background: '#d0e8c8',
    borderRadius: '35px 0 0 35px',
    transition: 'all 400ms ease-out',
  },

  'Button:hover,Button:focus': {
    borderColor: '#7d302a',
    color: '#7d302a',
    background: '#d9b8b4',
    boxShadow: '0px 0px 8px 0px #990f0f',
    textShadow: '#fff -1px -1px 1px, #fff 1px 1px 1px',
  },
};

const ListElement = () => {
  const context = useContext(controlBtnsOnOfContext);

  return (
    <ul>
      {context.elements.map(({ description, _id }) => (
        <li className={styles.Item} key={_id || description}>
          <p>{description}:</p>
          <button
            className={styles.Button}
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
