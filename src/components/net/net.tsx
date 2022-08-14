import React, { useState } from 'react';
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

function Net({ title, items }: TNetProps) {
  const [netElementsOpenState, setNetElementsOpenState] = useState(
    new Array(items.length).fill(false),
  );
  return (
    <div className={styles.main}>
      <button className={styles.header.main} type="button">
        <h3 className={styles.header.text}>{title}</h3>
      </button>
      <div className={styles.content.main}>
        <div className={styles.content.lines.vertical} />
        {
          items.map((item, index) => (
            <div className={styles.content.item} key={`Net-item-${index}`}>
              <div className={styles.content.lines.horizontal} />
              <NetElement {...item} />
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Net;
