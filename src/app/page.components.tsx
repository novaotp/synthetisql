
'use client';

// React
import { useEffect, useRef, useState } from "react";

// Internal

/// -- Styling -- ///
import styles from './page.module.scss';

/// -- Components -- ///
import Main from '@components/Main';
import Sidebar from "@components/Sidebar";
import Topbar from "@components/Topbar";

/// -- Models -- ///
import TableModel, { IndexedTableModel } from "@models/tables";

/** The main component of the landing page. */
const Landing = (): JSX.Element => {
  const [selectedTable, setSelectedTable] = useState<IndexedTableModel>();
  const [tables, setTables] = useState<IndexedTableModel[]>([]);

  const updateTable = (indexedTable: IndexedTableModel) => {
    setTables([...tables, { index: indexedTable.index, table: indexedTable.table }]);
  }

   // Get the highest index and add one (function)
  const highestIndex = () => {
    let highestIndex = 0;
    tables.forEach((table) => {
      if (table.index > highestIndex) {
        highestIndex = table.index;
      }
    });
    return highestIndex + 1;
  }

  const addTable = (table: TableModel) => {
    const index = highestIndex();

    setTables([...tables, { index, table }])
  }

  return (
    <div className={styles.landing}>
      <Sidebar selectedTable={selectedTable} updateTable={updateTable} />
      <div className={styles.vertical}>
        <Topbar addTable={addTable} />
        <Main tables={tables} setSelectedTable={setSelectedTable} />
      </div>
    </div>
  )
}

export default Landing;
