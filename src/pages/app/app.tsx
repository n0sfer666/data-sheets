import React from 'react';
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
  return (
    <div className={styles.main}>
      <button className={styles.header.main} type="button">
        <h1 className={styles.header.text}>data</h1>
      </button>
      <div className={styles.content.main}>
        <div className={styles.content.lines.vertical} />
        {
          data.map((item, index) => (
            <div className={styles.content.item} key={`Net-${index}`}>
              <div className={styles.content.lines.horizontal} />
              <Net {...item} />
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default App;
