
"use client";

// React
import { useEffect, useRef, useContext, useState } from 'react';

// Internal

/// -- Styling -- ///
import styles from './index.module.scss';
import styleVars from '../../assets/styles/variables.module.scss';

/// -- Components -- ///
import Table from '../Table';
import ContextMenu from './components/ContextMenu';
import TableProperties from './components/TableProperties';

/// -- Models -- ///
import { IndexedTableModel } from '@models/table';

/// -- Libs -- ///
import TablesContext from '@contexts/TablesContext';
import { useDatabase } from '@/libs/contexts/mockDB';

/** The area for moving the tables around. */
const Main = (): JSX.Element => {
  const { setSelectedTable, tables } = useContext(TablesContext);
  const [isContextMenuOnTable, setIsContextMenuOnTable] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const contextMenuRef = useRef<HTMLMenuElement>(null);
  const tablePropertiesRef = useRef<HTMLDialogElement>(null);

  const openTableProperties = (): void => {
    tablePropertiesRef.current!.showModal();
  }

  const closeTableProperties = () => {
    tablePropertiesRef.current!.close();
  }

  useEffect(() => {
    const handleLeftClick = (event: MouseEvent) => {
      const element = event.target as HTMLElement;

      contextMenuRef.current!.style.display = "none";

      if (
        ref.current!.contains(element) &&
        !element.hasAttribute("data-table") &&
        !contextMenuRef.current!.contains(element) &&
        !tablePropertiesRef.current!.open
      ) {
        setSelectedTable(undefined);
      }
    };

    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault();
      const element = event.target as HTMLElement;

      if (!ref.current!.contains(element)) return;
      
      setIsContextMenuOnTable(element.hasAttribute("data-table"));

      contextMenuRef.current!.style.display = "flex";
      contextMenuRef.current!.style.top = `${event.clientY - Number(styleVars.topbarHeightNum)}px`;
      contextMenuRef.current!.style.left = `${event.clientX}px`;
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
      <div>
        { tables.map((table, index) => <Table key={index} table={table} />) }
      </div>
      <ContextMenu menuRef={contextMenuRef} isOnTable={isContextMenuOnTable} openTableProperties={openTableProperties} />
      <TableProperties dialogRef={tablePropertiesRef} close={closeTableProperties} />
    </div>
  )
}

export default Main;
