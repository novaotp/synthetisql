
// React
import { useRef } from 'react';
import Draggable from "react-draggable";

// Internal
import styles from './index.module.scss';
import TableModel from '@models/tables';

interface TableProps {
  /** The table properties. */
  table: TableModel;
  /** Sets a new selected table or undefined. */
  setSelectedTable: (table: TableModel) => void;
}

const Table = ({ table, setSelectedTable }: TableProps): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);

  const handleOnClick = () => {
    setSelectedTable(table);
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
