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
  const callbacks = {
    onHeaderClick: useCallback(() => { setIsShowCards(!isShowCards); }, [isShowCards]),
  };
  return (
    <div className={styles.main}>
      <button className={styles.header.main} type="button" onClick={callbacks.onHeaderClick}>
        <h2 className={styles.header.text}>{title}</h2>
      </button>
      {(isShowCards) && (
      <>
        <div className={styles.content.verticalLine} />
        <div className={styles.content.main}>
          {
          items.map((item, index) => (
            <div className={styles.content.item} key={`NetElement-item-${index}`}>
              <Card key={`${title}-Card-${item.title}-${index}`} {...item} />
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
