import React from 'react';
import { TChangeEvent } from '../../pages/app/app.types';
import CloseSvg from '../close-svg/close-svg';
import { TRemoverProps } from './remover.types';

const styles = {
  main: 'Remover',
  button: 'Remover__button',
  container: 'Remover__container',
  select: 'Remover__select',
  selectTriangle: 'Remover__select-triangle',
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
        <div className={styles.container}>
          <select
            className={styles.select}
            onChange={callbacks.onSelectChange}
          >
            <option key={`option-${titles.length}`} value={titles.length}>choose net...</option>
            {
            titles.map((title, index) => (<option key={`option-${index}`} value={index}>{title}</option>))
          }
          </select>
          <div className={styles.selectTriangle}>
            <svg width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.666687 0.666656L4.00002 3.99999L7.33335 0.666656H0.666687Z" fill="#C4C4C4" />
            </svg>
          </div>
        </div>
        )
      }
    </div>
  );
}

export default Remover;
