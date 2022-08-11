import React, { useCallback, useState } from 'react';
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
  title, subTitle, dateStart, dateEnd, data,
}: TCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSortByIndex, setIsSortByIndex] = useState(true);
  const [isReverse, setIsReverse] = useState(false);
  const [tableData, setTableData] = useState(data.map(
    (item, index) => ({ ...item, id: index + 1 }),
  ) as Array<Record<string, number | string>>);

  const callbacks = {
    onHeaderClick: useCallback(() => {
      setIsOpen(!isOpen);
    }, [isOpen]),
    onTableHeaderClick: useCallback((event: React.MouseEvent) => {
      event.stopPropagation();
      const { currentTarget } = event;
      const isIndexButton = currentTarget.getAttribute('name') === 'index';
      if (isIndexButton) {
        setIsReverse(!isReverse);
      } else {
        setIsReverse(!isSortByIndex && !isReverse);
      }
      setIsSortByIndex(isIndexButton);
      setTableData(tableData.sort((a, b) => {
        const key = isIndexButton ? 'id' : 'number';
        if (Number(a[key]) < Number(b[key])) return isReverse ? -1 : 1;
        if (Number(a[key]) > Number(b[key])) return isReverse ? 1 : -1;
        return 0;
      }));
    }, [isSortByIndex, isReverse, tableData]),
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
      <button type="button" className={styles.header.main} onClick={callbacks.onHeaderClick}>
        <div className={styles.header.titleContainer}>
          <strong className={styles.header.title}>{title}</strong>
          <span className={styles.header.subTitle}>{subTitle}</span>
        </div>
        <div className={styles.header.date}>{`${formattedDate.start} - ${formattedDate.end}`}</div>
      </button>
      <tbody className={isOpen ? styles.data.states.isOpen : styles.data.main}>
        <tr>
          <th>
            <button type="button" name="index" onClick={callbacks.onTableHeaderClick}>
              #
              {(isSortByIndex) && (<Triangular isUp={!isReverse} />)}
            </button>
          </th>
          <th>
            <button type="button" name="title">
              Title
            </button>
          </th>
          <th>
            <button type="button" name="number" onClick={callbacks.onTableHeaderClick}>
              Number
              {(!isSortByIndex) && (<Triangular isUp={!isReverse} />)}
            </button>
          </th>
        </tr>
        {
          new Array(tableData.length < 13 ? 13 : tableData.length).fill(
            <tr>
              <td />
              <td />
              <td />
            </tr>,
          ).map((item, index) => (
            tableData[index]
              ? (
                <tr>
                  <td>{tableData[index].id}</td>
                  <td>{tableData[index].title}</td>
                  <td>{tableData[index].number}</td>
                </tr>
              )
              : item
          ))
        }
      </tbody>
    </table>
  );
}

export default Card;
