
"use client";

// React
import { useEffect, useRef, useContext } from 'react';

// Internal

/// -- Styling -- ///
import styles from './index.module.scss';
import styleVars from '../../styles/variables.module.scss';

/// -- Components -- ///
import Table from '../Table';

/// -- Models -- ///
import IndexedTableModel from '@/models/table';
import ContextMenu from './components/ContextMenu';

/// -- Libs -- ///
import TablesContext from '@/libs/contexts/TablesContext';

/** The area for moving the tables around. */
const Main = (): JSX.Element => {
  const { selectedTable, setSelectedTable, tables } = useContext(TablesContext);
  const ref = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLMenuElement>(null);

  useEffect(() => {
    const handleLeftClick = (event: MouseEvent) => {
      const element = event.target as HTMLElement;

      menuRef.current!.style.display = "none";

      if (ref.current!.contains(element) && !(element).hasAttribute("data-table")) {
        setSelectedTable(undefined);
      }
    };

    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault();
      const element = event.target as HTMLElement;

      if (ref.current!.contains(element) && !(element).hasAttribute("data-table")) {
        menuRef.current!.style.display = "flex";
        menuRef.current!.style.top = `${event.clientY - Number(styleVars.topbarHeightNum)}px`;
        menuRef.current!.style.left = `${event.clientX - Number(styleVars.sidebarWidthNum)}px`;
      }
    }

    document.addEventListener('click', handleLeftClick);
    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      document.removeEventListener('click', handleLeftClick);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  return (
    <div ref={ref} className={styles.main}>
      { tables.map((table: IndexedTableModel, index: number) => <Table key={index} table={table} /> ) }
      <ContextMenu menuRef={menuRef} />
    </div>
  )
}

export default Main;
