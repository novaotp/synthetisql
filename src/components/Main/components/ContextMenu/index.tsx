
"use client";

// React
import { type RefObject, useContext } from 'react';

// Internal
import styles from './index.module.scss';
import TablesContext from '@contexts/TablesContext';
import Item from './components/Item';

interface ContextMenuProps {
  /** The ref of the menu. */
  menuRef: RefObject<HTMLMenuElement>,
  /** If the click for the context menu is on a table or not. */
  isOnTable: boolean,
}

const ContextMenu = ({ menuRef, isOnTable }: ContextMenuProps) => {
  const { addTable } = useContext(TablesContext);

  return (
    <menu ref={menuRef} className={styles.menu}>
      {
        !isOnTable
          ? <Item label="Add table" onClick={() => addTable()} />
          : (
            <>
              <Item label="Add column" onClick={() => null} />
              <Item label="Delete table" onClick={() => null} />
            </>
          )
      }
    </menu>
  )
}

export default ContextMenu;
