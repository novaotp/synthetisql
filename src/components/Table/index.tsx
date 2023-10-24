
// React
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import Draggable, { ControlPosition, DraggableData, DraggableEvent } from "react-draggable";

// Internal
import styles from './index.module.scss';

/// -- Models -- ///
import IndexedTableModel from '@models/table';
import Row from '@models/row/impl';

interface TableProps {
  /** The table's properties. */
  table: IndexedTableModel,
  /** The index of the selected table. */
  selectedTable: IndexedTableModel | undefined,
  /** Sets the index of the selected table. */
  setSelectedTable: Dispatch<SetStateAction<IndexedTableModel | undefined>>,
}

const Table = ({ table, selectedTable, setSelectedTable }: TableProps): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOverlapping, setIsOverlapping] = useState<boolean>(false);
  const [position, setPosition] = useState<ControlPosition>({ x: 0, y: 0 });
  const [dragStartPosition, setDragStartPosition] = useState<ControlPosition>({ x: 0, y: 0 });

  const handleDragStart = (event: DraggableEvent, data: DraggableData) => {
    setDragStartPosition({ x: data.x, y: data.y });
  }

  const handleStop = (event: DraggableEvent, data: DraggableData): void => {
    checkOverlapping() ? setPosition(dragStartPosition) : setPosition({ x: data.x, y: data.y });
    setIsOverlapping(false);
  }

  /** Checks if the current table is overlapping with other tables. */
  const checkOverlapping = (): boolean => {
    if (ref.current === null) return false;

    const rect1 = ref.current.getBoundingClientRect();
    const tables = document.querySelectorAll('[data-table]');

    for (let i = 0; i < tables.length; i++) {
      const table = tables[i];

      if (table === ref.current) continue;

      const rect2 = table.getBoundingClientRect();
      const overlapping = !(
        rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom
      );

      if (overlapping) return true;
    }
  
    return false;
  }

  return (
    <Draggable
      nodeRef={ref}
      position={position}
      bounds={{
        top: 0,
        right: window.innerWidth - 300 - 200,
        bottom: window.innerHeight - 40 - 100,
        left: 0
      }}
      onMouseDown={() => { setSelectedTable(table) }}
      onStart={handleDragStart}
      onDrag={() => setIsOverlapping(checkOverlapping())}
      onStop={handleStop}
    >
      <div
        className={`${styles.table} ${selectedTable?.id === table.id ? styles.selected : ''} ${isOverlapping ? styles.overlapping : ''}`}
        ref={ref}
        data-table
      >
        <div className={styles.header}>{table.table.name}</div>
        {
          table.table.rows.map(({ id, row }) => {
            return (
              <div key={id} className={styles.row}>{row.name} : {row.type}{row.precision ? `(${row.precision})` : ''}</div>
            )
          })
        }
        <div className={styles.empty}></div>
      </div>
    </Draggable>
  )
}

export default Table;
