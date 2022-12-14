import React, { useState } from 'react';
import Triangular from '../triangular/triangular';
import { TCardProps } from './card.types';

const getZeroBefore = (number: number): string => (number < 10 ? `0${number}` : String(number));

const styles = {
  main: 'Card',
  header: {
    main: 'Card__header',
    titleContainer: 'Card__header-title',
    title: 'Card__header-title-main',
    subTitle: 'Card__header-title-sub',
    date: 'Card__header-date',
  },
  data: {
    main: 'Card__data',
    header: 'Card__data-header',
    states: {
      isOpen: 'Card__data Card__data_state_isOpen',
    },
  },
};

function Card({
  title, subTitle, dateStart, dateEnd, data, onHeaderClick, isOpen, cardIndex,
}: TCardProps) {
  const [isSortByIndex, setIsSortByIndex] = useState(true);
  const [tableData, setTableData] = useState(data.map(
    (item, index) => ({ ...item, id: index + 1 }),
  ) as Array<Record<string, number | string>>);

  const callbacks = {
    onHeaderClick: () => {
      onHeaderClick(cardIndex);
    },
    onTableHeaderClick: (event: React.MouseEvent) => {
      event.stopPropagation();
      const { currentTarget } = event;
      const isIndexButton = currentTarget.getAttribute('data-name') === 'index';
      setIsSortByIndex(isIndexButton);
      setTableData(tableData.sort((a, b) => {
        const key = isIndexButton ? 'id' : 'number';
        if (Number(a[key]) < Number(b[key])) return -1;
        if (Number(a[key]) > Number(b[key])) return 1;
        return 0;
      }));
    },
  };
  const dates = {
    start: new Date(dateStart),
    end: new Date(dateEnd),
  };
  const formattedDate = {
    start: `${getZeroBefore(dates.start.getDate())}.${getZeroBefore(dates.start.getMonth())}.${dates.start.getFullYear()}`,
    end: `${getZeroBefore(dates.end.getDate())}.${getZeroBefore(dates.end.getMonth())}.${dates.end.getFullYear()}`,
  };

  return (
    <table className={styles.main}>
      <thead>
        <tr>
          <th className={styles.header.main} onClick={callbacks.onHeaderClick}>
            <div className={styles.header.titleContainer}>
              <h4 className={styles.header.title}>{title}</h4>
              <h5 className={styles.header.subTitle}>{subTitle}</h5>
            </div>
            <div className={styles.header.date}>{`${formattedDate.start} - ${formattedDate.end}`}</div>
          </th>
        </tr>
      </thead>
      {(isOpen) && (
        <tbody className={styles.data.main}>
          <tr>
            <th key="index" data-name="index" onClick={callbacks.onTableHeaderClick}>
              #
              {(isSortByIndex) && (<Triangular />)}
            </th>
            <th key="title">
              Title
            </th>
            <th key="number" data-name="number" onClick={callbacks.onTableHeaderClick}>
              Number
              {(!isSortByIndex) && (<Triangular />)}
            </th>
          </tr>
          {
          new Array(tableData.length < 13 ? 13 : tableData.length).fill(null).map((item, index) => (
            tableData[index]
              ? (
                <tr key={`tableRow-${index + 1}`}>
                  <td key="index">{tableData[index].id}</td>
                  <td key="title">{tableData[index].title}</td>
                  <td key="number">{tableData[index].number}</td>
                </tr>
              )
              : (
                <tr key={`tableRow-${index + 1}`}>
                  <td key="index" />
                  <td key="title" />
                  <td key="number" />
                </tr>
              )
          ))
        }
        </tbody>
      )}
    </table>
  );
}

export default Card;
