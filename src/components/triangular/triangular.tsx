import React from 'react';
import { TTriangularProps } from './triangular.types';

const styles = {
  main: 'Triangular',
  symbol: 'Triangular__symbol',
  states: {
    isUp: 'Triangular Triangular_state_isUp',
  },
};

function Triangular({ isUp }: TTriangularProps) {
  return (
    <i className={isUp ? styles.states.isUp : styles.main}>
      <svg className={styles.symbol} width="7" height="4" viewBox="0 0 7 4" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0L3.33333 3.33333L6.66667 0H0Z" fill="#2E465C" />
      </svg>
    </i>
  );
}

export default React.memo(Triangular);
