import React, { useEffect, useRef, useState } from 'react';
import { container } from 'webpack';
import Net from '../../components/net/net';
import { TAppProps } from './app.types';

const styles = {
  main: 'App',
  header: {
    main: 'App__header',
    text: 'App__header-text',
  },
  content: {
    main: 'App__content',
    item: 'App__content-item',
    lines: {
      horizontal: 'App__content-line-horizontal',
      vertical: 'App__content-line-vertical',
    },
  },
};

function App({ data }: TAppProps) {
  const refContent = useRef<HTMLDivElement>(null);
  const refLastItem = useRef<HTMLDivElement>(null);
  const [isChangeNotLast, setIsChangeNotLast] = useState(false);
  const [heightVertLine, setHeightVertLine] = useState(0);
  useEffect(() => {
    const height = {
      container: refContent.current?.clientHeight as number,
      lastItem: refLastItem.current?.clientHeight as number,
      additional: 36,
    };
    setHeightVertLine(
      data.length === 1
        ? height.additional
        : height.container - height.lastItem + height.additional,
    );
  }, [isChangeNotLast]);
  const callbacks = {
    onOpen: (index: number) => {
      if (data.length > index + 1) {
        setIsChangeNotLast(!isChangeNotLast);
      }
    },
  };
  return (
    <div className={styles.main}>
      <button className={styles.header.main} type="button">
        <h1 className={styles.header.text}>data</h1>
      </button>
      <div className={styles.content.main} ref={refContent}>
        <div style={{ height: heightVertLine }} className={styles.content.lines.vertical} />
        {
          data.map((item, index) => (
            <div ref={data.length === (index + 1) ? refLastItem : null} className={styles.content.item} key={`Net-${index}`}>
              <div className={styles.content.lines.horizontal} />
              <Net netIndex={index} onOpenSubNet={callbacks.onOpen} {...item} />
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default App;
