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

const footerIndexes = {
  remover: 0,
  finder: 1,
};

function App({ data }: TAppProps) {
  const refContent = useRef<HTMLDivElement>(null);
  const refLastItem = useRef<HTMLDivElement>(null);
  const [isChangeNotLast, setIsChangeNotLast] = useState(false);
  const [heightVertLine, setHeightVertLine] = useState(0);
  const [footerOpenState, setFooterOpenState] = useState(
    new Array(Object.keys(footerIndexes).length).fill(false),
  );
  const [netsShowState, setNetsShowState] = useState(
    new Array(data.length).fill(true),
  );
  const [lastNetIndex, setLastNetIndex] = useState(data.length - 1);
  useEffect(() => {
    const height = {
      container: refContent.current?.clientHeight as number,
      lastItem: refLastItem.current?.clientHeight as number,
      additional: 36,
    };
    setHeightVertLine(
      lastNetIndex === 0
        ? height.additional
        : height.container - height.lastItem + height.additional,
    );
  }, [isChangeNotLast]);
  const callbacks = {
    onOpenNet: (netIndex: number) => {
      if (lastNetIndex > netIndex) {
        setIsChangeNotLast(!isChangeNotLast);
      }
    },
    onClickFooterElement: (elementIndex: number) => {
      setFooterOpenState(
        footerOpenState.map((isOpen, index) => (elementIndex === index ? !isOpen : false)),
      );
    },
    onChangeFinder: (event: TChangeEvent) => { console.log('Finder'); },
    onChangeRemover: (optionValue: number) => {
      setNetsShowState(
        netsShowState.map((isShow, index) => (index === optionValue ? !isShow : isShow)),
      );
      netsShowState.forEach((isOpen, index) => {
        if (isOpen) setLastNetIndex(index);
      });
      if (lastNetIndex > optionValue) {
        setIsChangeNotLast(!isChangeNotLast);
      }
    },
  };
  return (
    <Layout footer={(
      <>
        <Remover
          titles={data.map((item) => item.title)}
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
        {
          (netsShowState.reduce((total, next) => total || next)) && (
          <div className={styles.content.main} ref={refContent}>
            <div style={{ height: heightVertLine }} className={styles.content.lines.vertical} />
            {
            data.map((item, index) => (
              netsShowState[index]
                ? (
                  <div
                    ref={lastNetIndex === index ? refLastItem : null}
                    className={styles.content.item}
                    key={`Net-${index}`}
                  >
                    <div className={styles.content.lines.horizontal} />
                    <Net netIndex={index} onOpenSubNet={callbacks.onOpenNet} {...item} />
                  </div>
                )
                : null
            ))
          }
          </div>
          )
        }
      </div>
    </Layout>
  );
}

export default App;
