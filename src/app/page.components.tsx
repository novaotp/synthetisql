
'use client';

// React
import { useState } from 'react';

// Internal

/// -- Styling -- ///
import styles from './page.module.scss';

/// -- Components -- ///
import Main from '@components/Main';
import Topbar from "@components/Topbar";

/// -- Models -- ///
import IndexedTableModel, { TableModel } from '@models/table';
import TableModelImpl from '@models/table/impl';

/// -- Libs -- ///
import TablesContext from '@/libs/contexts/TablesContext';

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
   * Updates a table in the list of tables if the table is defined.
   * @param table The indexed table to update
   */
  const updateTable = (table: IndexedTableModel | undefined) => {
    if (!table) return;

    setTables((prevTables: IndexedTableModel[]) => prevTables.map(prevTable => prevTable.id === table.id ? table : prevTable))
  }

  /**
   * Deletes a table from the list of tables if the table is defined.
   * @param table The indexed table to update
   */
  const deleteTable = (table: IndexedTableModel | undefined) => {
    if (!table) return;

    setTables((prevTables: IndexedTableModel[]) => prevTables.filter(prevTable => prevTable.id !== table.id))
  }

  return (
    <TablesContext.Provider value={{ selectedTable, setSelectedTable, tables, setTables, addTable, updateTable, deleteTable }}>
      <div className={styles.landing}>
        <Topbar />
        <Main />
      </div>
    </TablesContext.Provider>
  )
}

export default Landing;
