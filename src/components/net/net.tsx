import React, {
  useEffect, useRef, useState,
} from 'react';
import NetElement from '../net-element/net-element';
import { TNetProps } from './net.types';

const styles = {
  main: 'Net',
  header: {
    main: 'Net__header',
    text: 'Net__header-text',
  },
  content: {
    main: 'Net__content',
    item: 'Net__content-item',
    lines: {
      horizontal: 'Net__content-line-horizontal',
      vertical: 'Net__content-line-vertical',
    },
  },
};

function Net({
  title, items, netIndex, onOpenSubNet,
}: TNetProps) {
  const refContent = useRef<HTMLDivElement>(null);
  const [heightVertLine, setHeightVertLine] = useState(0);
  const [netElementsOpenState, setNetElementsOpenState] = useState(
    new Array(items.length).fill(false),
  );
  const [isChangeNotLastState, setIsChangeNotLastState] = useState(false);
  const callbacks = {
    onElementOpen: (netElementIndex: number, isCard?: boolean) => {
      if (!isCard) {
        setNetElementsOpenState(
          netElementsOpenState.map(
            (isOpen, index) => (index === netElementIndex ? !isOpen : isOpen),
          ),
        );
      }
      if (netElementIndex < items.length - 1) {
        onOpenSubNet(netIndex);
        setIsChangeNotLastState(!isChangeNotLastState);
      }
    },
  };
  useEffect(() => {
    setHeightVertLine(refContent.current?.clientHeight as number);
  }, [isChangeNotLastState]);
  return (
    <div className={styles.main}>
      <button className={styles.header.main} type="button">
        <h3 className={styles.header.text}>{title}</h3>
      </button>
      <div className={styles.content.main} ref={refContent}>
        <div
          style={{ height: heightVertLine }}
          className={styles.content.lines.vertical}
        />
        {
          items.map((item, index) => (
            <div className={styles.content.item} key={`Net-item-${index}`}>
              <div className={styles.content.lines.horizontal} />
              <NetElement
                onOpen={callbacks.onElementOpen}
                isOpen={netElementsOpenState[index]}
                netElementIndex={index}
                {...item}
              />
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Net;
