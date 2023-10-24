
// React
import { useState } from 'react';

// Internal

/// -- Styling -- ///
import styles from './index.module.scss';

/// -- Components -- ///
import Row from './components/Row';

/// -- Models -- ///
import IndexedTableModel from '@models/table';
import IndexedRowModel from '@models/row';
import RowImpl from '@models/row/impl';

/// -- Utils -- ///
import uniqueId from '@utils/uniqueId';
import Header from './components/Header';

interface SidebarProps {
  /** The index of the selected table. */
  selectedTable: IndexedTableModel | undefined,
  /** Updates a table in the list of tables. */
  updateTable: (table: IndexedTableModel) => void
}

/** A sidebar tool for tables. */
const Sidebar = ({ selectedTable, updateTable }: SidebarProps): JSX.Element => {
  const [openedRowId, setOpenedRowId] = useState<string>("");

  /**
   * Changes the name of the currently selected indexed table.
   * @param name The new name of the selected indexed table.
   */
  const changeName = (name: string): void => {
    if (!selectedTable) return;

    selectedTable.table.name = name;
    updateTable(selectedTable);
  }

  /** Adds a new row with a unique ID. */
  const handleAddRow = (): void => {
    if (!selectedTable) return;

    const defaultRow: IndexedRowModel = {
      id: uniqueId(),
      row: RowImpl.default()
    }

    selectedTable.table.rows.push(defaultRow);
    updateTable(selectedTable);
  }

  /**
   * Updates the value of a given key of a given row (via its index).
   * @param event The onChange event
   * @param index The index of the row to update
   * @param key The key of the property to update in the row
   */
  const handleRowChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, id: string, key: any): void => {
    if (!selectedTable) return;

    /** @ts-ignore ts(2322) */
    selectedTable
      .table
      .rows
      .find(row => row.id === id)!
      .row[key] = event.target.value;

    updateTable(selectedTable);
  }

  if (!selectedTable) {
    return (
      <div className={`${styles.sidebar} ${styles.centerP}`}>
        <p>Select a table to get started.</p>
      </div>
    )
  }

  return (
    <div className={styles.sidebar}>
      <Header
        selectedTable={selectedTable}
        changeName={changeName}
        handleAddRow={handleAddRow}
      />
      {
        selectedTable.table.rows.map(({ id, row }) => {
          return (
            <Row
              id={id}
              row={row}
              openedRowId={openedRowId}
              setOpenedRowId={setOpenedRowId}
              handleRowChange={handleRowChange}
            />
          )
        })
      }
    </div>
  )
}

export default Sidebar;
