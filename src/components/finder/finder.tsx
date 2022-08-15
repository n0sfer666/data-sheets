import React from 'react';
import { TChangeEvent } from '../../pages/app/app.types';
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
      onChange('');
    },
    onSelectChange: (event: TChangeEvent) => {
      event.stopPropagation();
      const { value } = event.currentTarget;
      onChange(value);
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
