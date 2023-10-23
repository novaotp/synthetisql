
import TableModel from '@models/tables';
import styles from './index.module.scss';
import Table from '../Table';
import { useEffect, useRef } from 'react';

interface MainProps {
  /** The tables to display. */
  tables: TableModel[];
  /** Sets a new selected table or undefined. */
  setSelectedTable: (table: TableModel | undefined) => void;
}

const Main = ({ tables, setSelectedTable }: MainProps): JSX.Element => {
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
        tables.map((table, index) => (
          <Table
            key={index}
            table={table}
            setSelectedTable={setSelectedTable}
          />
        ))
      }
    </div>
  )
}

export default Main;
