import React, { useState } from 'react';
import { TChangeEvent } from '../../index.types';
import LensSvg from '../lens-svg/lens-svg';
import { TFinderProps } from './finder.types';

const styles = {
  main: 'Finder',
  button: 'Finder__button',
  input: 'Finder__input',
};

function Finder({
  isOpen, elementIndex, onClick, onChange,
}: TFinderProps) {
  const callbacks = {
    onButtonClick: () => {
      onClick(elementIndex);
    },
    onSelectChange: (event: TChangeEvent) => {
      event.stopPropagation();
      onChange();
    },
  };
  return (
    <div className={styles.main}>
      {
        (isOpen) && (<input type="text" className={styles.input} onChange={callbacks.onSelectChange} />)
      }
      <button className={styles.button} type="button" onClick={callbacks.onButtonClick}>
        <LensSvg />
      </button>
    </div>
  );
}

export default Finder;
