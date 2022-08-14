import React, { useCallback, useState } from 'react';
import Card from '../card/card';
import { TNetElementProps } from './net-element.types';

const styles = {
  main: 'NetElement',
  header: {
    main: 'NetElement__header',
    text: 'NetElement__header-text',
  },
  content: {
    main: 'NetElement__content',
    item: 'NetElement__content-item',
    verticalLine: 'NetElement__content-verticalLine',
  },
};

function NetElement({ title, items }: TNetElementProps) {
  const [isShowCards, setIsShowCards] = useState(false);
  const [cardsOpenState, setCardOpenState] = useState(new Array(items.length).fill(false));
  const callbacks = {
    onHeaderClick: useCallback(() => {
      setIsShowCards(!isShowCards);
    }, [isShowCards]),
    onOpenCard: useCallback((cardIndex: number) => {
      setCardOpenState(
        cardsOpenState.map((cardState, index) => (cardIndex === index ? !cardState : false)),
      );
    }, [cardsOpenState]),
  };
  return (
    <div className={styles.main}>
      <button className={styles.header.main} type="button" onClick={callbacks.onHeaderClick}>
        <h3 className={styles.header.text}>{title}</h3>
      </button>
      {(isShowCards) && (
      <>
        <div className={styles.content.verticalLine} />
        <div className={styles.content.main}>
          {
          items.map((item, index) => (
            <div className={styles.content.item} key={`Card-${index}`}>
              <Card
                cardIndex={index}
                onHeaderClick={callbacks.onOpenCard}
                isOpen={cardsOpenState[index]}
                {...item}
              />
            </div>
          ))
        }
        </div>
      </>
      )}
    </div>
  );
}

export default NetElement;
