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
  isOpen, elementIndex, onClick, onChange, titles,
}: TRemoverProps) {
  const callbacks = {
    onButtonClick: () => {
      onClick(elementIndex);
    },
    onSelectChange: (event: TChangeEvent) => {
      event.stopPropagation();
      const { value } = event.currentTarget;
      onChange(Number(value));
    },
  };
  return (
    <div className={styles.main}>
      <button className={styles.button} type="button" onClick={callbacks.onButtonClick}>
        <CloseSvg />
      </button>
      {
        (isOpen) && (
        <select
          className={styles.select}
          onChange={callbacks.onSelectChange}
        >
          <option key={`option-${titles.length}`} value={titles.length}>choose net...</option>
          {
            titles.map((title, index) => (<option key={`option-${index}`} value={index}>{title}</option>))
          }
        </select>
        )
      }
    </div>
  );
}

export default Remover;
