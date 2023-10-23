
// React
import { useEffect, useRef } from 'react';

// Internal

/// -- Styling -- ///
import styles from './index.module.scss';

/// -- Components -- ///
import Table from '../Table';

/// -- Hooks -- ///
import useSelectedTable from '@hooks/useSelectedTable';
import useTables from '@hooks/useTables';

/** The area for moving the tables around. */
const Main = (): JSX.Element => {
  const { setSelectedTable } = useSelectedTable();
  const { tables } = useTables();
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
      { tables.map((table, index) => <Table key={index} indexedTable={table} />) }
    </div>
  )
}

export default Main;
