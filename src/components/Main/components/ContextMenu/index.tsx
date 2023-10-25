
"use client";

// React
import { type RefObject, type FocusEvent, useContext } from 'react';

// Internal
import styles from './index.module.scss';
import TablesContext from '@/libs/contexts/TablesContext';

interface ContextMenuProps {
  /** The ref of the menu. */
  menuRef: RefObject<HTMLMenuElement>,
}

const ContextMenu = ({ menuRef }: ContextMenuProps) => {
  const { addTable } = useContext(TablesContext);

  return (
    <menu ref={menuRef} className={styles.menu}>
      <li>
        <button onClick={() => addTable()}>Add table</button>
      </li>
    </menu>
  )
}

export default ContextMenu;
