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

const getLastItemHeight = (container: React.RefObject<HTMLDivElement>): number => {
  if (container.current) {
    const { lastChild } = container.current;
    return (lastChild as HTMLElement).offsetHeight;
  }
  return 0;
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
  useEffect(() => {
    const container = refContent.current
      ? refContent.current.clientHeight
      : 0;
    const lastItem = refLastItem.current
      ? refLastItem.current.clientHeight
      : getLastItemHeight(refContent);
    const height = {
      container,
      lastItem,
      additional: 36,
    };
    setHeightVertLine(
      data.length === 1
        ? height.additional
        : height.container - height.lastItem + height.additional,
    );
  }, [isChangeNotLast]);
  const callbacks = {
    onOpenNet: (netIndex: number) => {
      if (data.length > netIndex + 1) {
        setIsChangeNotLast(!isChangeNotLast);
      }
    },
    onClickFooterElement: (elementIndex: number) => {
      setFooterOpenState(
        footerOpenState.map((isOpen, index) => (elementIndex === index ? !isOpen : false)),
      );
    },
    onChangeFinder: (inputValue: string) => {
      setNetsShowState(
        netsShowState.map(
          (_, index) => data[index].title.search(inputValue) >= 0,
        ),
      );
      setIsChangeNotLast(!isChangeNotLast);
    },
    onChangeRemover: (optionValue: number) => {
      setNetsShowState(
        netsShowState.map((isShow, index) => (index === optionValue ? !isShow : isShow)),
      );
      setIsChangeNotLast(!isChangeNotLast);
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
          netsShowState={netsShowState}
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
                    ref={data.length === (index + 1) ? refLastItem : null}
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
