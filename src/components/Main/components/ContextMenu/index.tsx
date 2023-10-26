
"use client";

// React
import { type RefObject, useContext } from 'react';

// Internal
import styles from './index.module.scss';
import Item from './components/Item';
import TablesContext from '@contexts/TablesContext';

interface ContextMenuProps {
  /** The ref of the menu. */
  menuRef: RefObject<HTMLMenuElement>,
  /** If the click for the context menu is on a table or not. */
  isOnTable: boolean,
  /** The function to open the table properties. */
  openTableProperties: () => void,
}

const ContextMenu = ({ menuRef, isOnTable, openTableProperties }: ContextMenuProps) => {
  const { selectedTable, addTable, deleteTable } = useContext(TablesContext);

  return (
    <menu ref={menuRef} className={styles.menu}>
      {
        !isOnTable
          ? <Item label="Add table" onClick={() => addTable()} />
          : (
            <>
              <Item label="Edit table" onClick={() => openTableProperties()} />
              <Item label="Delete table" onClick={() => deleteTable(selectedTable)} />
            </>
          )
      }
    </menu>
  )
}

export default ContextMenu;
