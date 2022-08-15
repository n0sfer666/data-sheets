import React, { useEffect, useRef, useState } from 'react';
import Finder from '../../components/finder/finder';
import Layout from '../../components/layout/layout';
import Net from '../../components/net/net';
import Remover from '../../components/remover/remover';
import { TAppProps, TChangeEvent } from './app.types';

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
  const [footerOpenState, setFooterOpenState] = useState([false, false]);
  const footerIndexes = {
    remover: 0,
    finder: 1,
  };
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
    onClickFooterElement: (elementIndex: number) => {
      setFooterOpenState(
        footerOpenState.map((isOpen, index) => (elementIndex === index ? !isOpen : false)),
      );
    },
    onChangeFinder: (event: TChangeEvent) => { console.log('Finder'); },
    onChangeRemover: (event: TChangeEvent) => { console.log('Remover'); },
  };
  return (
    <Layout footer={(
      <>
        <Remover
          elementIndex={footerIndexes.remover}
          onClick={callbacks.onClickFooterElement}
          onChange={callbacks.onChangeRemover}
          isOpen={footerOpenState[footerIndexes.remover]}
        />
        <Finder
          elementIndex={footerIndexes.finder}
          onClick={callbacks.onClickFooterElement}
          onChange={callbacks.onChangeFinder}
          isOpen={footerOpenState[footerIndexes.finder]}
        />
      </>
)}
    >
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
    </Layout>
  );
}

export default App;
