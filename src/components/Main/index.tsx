
// React
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';

// Internal

/// -- Styling -- ///
import styles from './index.module.scss';

/// -- Components -- ///
import Table from '../Table';
import { IndexedTableModel } from '@/models/tables';

interface MainProps {
  /** The list of tables to display. */
  tables: IndexedTableModel[],
  /** The selected table. */
  selectedTable: IndexedTableModel | undefined,
  /** Sets the index of the selected table. */
  setSelectedTable: Dispatch<SetStateAction<IndexedTableModel | undefined>>,
}

/** The area for moving the tables around. */
const Main = ({ tables, selectedTable, setSelectedTable }: MainProps): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const element = event.target as HTMLElement;

      if (ref.current!.contains(element) && !(element).hasAttribute("data-table")) {
        setSelectedTable(undefined);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div ref={ref} className={styles.main}>
      {
        tables.map((table: IndexedTableModel, index: number) => {
          return (
            <Table
              key={index}
              table={table}
              selectedTable={selectedTable}
              setSelectedTable={setSelectedTable}
            />
          )
        })}
    </div>
  )
}

export default Main;
