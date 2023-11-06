
"use client";

// React
import { useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Internal

/// -- Styling -- ///
import styles from './index.module.scss';

/// -- Components -- ///
import Header from './components/Header';
import Row from './components/Row';

/// -- Models -- ///
import RowImpl, { IndexedRowModel, RowModelKey } from '@models/row';

/// -- Libs -- ///
import TablesContext from '@contexts/TablesContext';

/** A sidebar tool for tables. */
const Sidebar = (): JSX.Element => {
  const [openedRowId, setOpenedRowId] = useState<string>("");
  const { selectedTable, updateTable } = useContext(TablesContext);

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
      id: uuidv4(),
      row: RowImpl.default()
    }

    selectedTable.table.rows.push(defaultRow);
    updateTable(selectedTable);
  }

  /**
   * Updates the value of a given key of a given row (via its index).
   * @param rowId The index of the row to update
   * @param key The key of the property to update in the row
   * @param value The new value of the property
   */
  const changeRow = (rowId: string, key: RowModelKey, value: any): void => {
    if (!selectedTable) return;

    /** @ts-ignore ts(2322) */
    selectedTable
      .table
      .rows
      .find(row => row.id === rowId)!
      .row[key] = value;

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
        selectedTable.table.rows.map((indexedRow: IndexedRowModel) => {
          return (
            <Row
              key={indexedRow.id}
              indexedRow={indexedRow}
              openedRowId={openedRowId}
              setOpenedRowId={setOpenedRowId}
              changeRow={changeRow}
            />
          )
        })
      }
    </div>
  )
}

export default Sidebar;
