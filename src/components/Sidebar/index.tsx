
import TableModel from '@models/tables';
import styles from './index.module.scss';
import { SyntheticEvent, useState } from 'react';

interface SidebarProps {
  /** The selected table. */
  selectedTable: TableModel | undefined;
  /** Updates the selected table */
  updateTable: (table: TableModel) => void;
}

/** A sidebar tool for tables. */
const Sidebar = ({ selectedTable, updateTable }: SidebarProps): JSX.Element => {
  const handleChange = (event: any) => {
    if (!selectedTable) return;

    selectedTable.name = event.target.value;
    updateTable(selectedTable);
  }

  return (
    <div className={styles.sidebar}>
      { selectedTable
          ? <input
              type="text"
              value={selectedTable.name}
              onChange={handleChange}
            />
          : <p>Select a table to get started.</p>
      }
    </div>
  )
}

export default Sidebar;
