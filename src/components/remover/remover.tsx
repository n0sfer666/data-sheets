import React from 'react';
import { TChangeEvent } from '../../pages/app/app.types';
import CloseSvg from '../close-svg/close-svg';
import { TRemoverProps } from './remover.types';

const styles = {
  main: 'Remover',
  button: 'Remover__button',
  select: 'Remover__select',
};

function Remover({
  isOpen, elementIndex, onClick, onChange,
}: TRemoverProps) {
  const callbacks = {
    onButtonClick: () => {
      onClick(elementIndex);
    },
    onSelectChange: (event: TChangeEvent) => {
      event.stopPropagation();
      const { value } = event.currentTarget;
      onChange();
      console.log(value);
    },
  };
  return (
    <div className={styles.main}>
      <button className={styles.button} type="button" onClick={callbacks.onButtonClick}>
        <CloseSvg />
      </button>
      {
        (isOpen) && (
        <select className={styles.select} onChange={callbacks.onSelectChange}>
          <option key={0} value="0">zero</option>
          <option key={1} value="1">one</option>
        </select>
        )
      }
    </div>
  );
}

export default Remover;
