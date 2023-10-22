
// React
import { useRef } from 'react';
import Draggable from "react-draggable";

// Internal
import styles from './index.module.scss';
import TableModel from '@models/tables';

interface TableProps {
  /** The table properties. */
  table: TableModel;
  /** The function to handle the selected table. */
  handleSelectedTable: (table: TableModel) => void;
}

const Table = ({ table, handleSelectedTable }: TableProps): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);

  const handleOnClick = () => {
    handleSelectedTable(table);
  }

  return (
    <Draggable
      nodeRef={ref}
      bounds={{
        top: 0,
        right: window.innerWidth + 300,
        bottom: window.innerHeight - 40 - 100,
        left: 0
      }}
    >
      <div
        className={styles.table}
        ref={ref}
        onClick={handleOnClick}
        data-table
      >
        <p className={styles.header}>{table.name}</p>
      </div>
    </Draggable>
  )
}

export default Table;
