import React, { useState } from 'react';
import LensSvg from '../lens-svg/lens-svg';

const styles = {
  main: 'Finder',
  button: 'Finder__button',
  input: 'Finder__input',
};

function Finder() {
  const [isOpen, setIsOpen] = useState(false);
  const callbacks = {
    onButtonClick: () => {
      setIsOpen(!isOpen);
    },
  };
  return (
    <div className={styles.main}>
      {
        (isOpen) && (<input style={{ marginLeft: '8px' }} className={styles.input} />)
      }
      <button className={styles.button} type="button" onClick={callbacks.onButtonClick}>
        <LensSvg />
      </button>
    </div>
  );
}

export default Finder;
