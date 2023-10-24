
'use client';

// React
import { useState } from 'react';

// Internal

/// -- Styling -- ///
import styles from './page.module.scss';

/// -- Components -- ///
import Main from '@components/Main';
import Sidebar from "@components/Sidebar";
import Topbar from "@components/Topbar";

/// -- Models -- ///
import IndexedTableModel, { TableModel } from '@models/table';
import TableModelImpl from '@models/table/impl';

/// -- Utils -- ///
import uniqueId from '@utils/uniqueId';

/** The main component of the landing page. */
const Landing = (): JSX.Element => {
  const [selectedTable, setSelectedTable] = useState<IndexedTableModel | undefined>(undefined);
  const [tables, setTables] = useState<IndexedTableModel[]>([]);

  /**
   * Adds a new table to the list of tables.
   * @param table The table to add
   */
  const addTable = (table: TableModel = TableModelImpl.default()) => {
    let id: string = uniqueId();
    
    setTables((prevTables: IndexedTableModel[]) => [...prevTables, { id: id, table }])
  }

  /**
   * Updates a table in the list of tables.
   * @param table The indexed table to update
   */
  const updateTable = (table: IndexedTableModel) => {
    setTables((prevTables: IndexedTableModel[]) => prevTables.map(prevTable => prevTable.id === table.id ? table : prevTable))
  }
  
  return (
    <div className={styles.landing}>
      <Sidebar selectedTable={selectedTable} updateTable={updateTable} />
      <div className={styles.vertical}>
        <Topbar addTable={addTable} />
        <Main selectedTable={selectedTable} setSelectedTable={setSelectedTable} tables={tables} />
      </div>
    </div>
  )
}

export default Landing;
