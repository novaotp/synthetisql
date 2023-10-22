
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
import TableModel from "@models/tables";

/** The main component of the landing page. */
const Landing = (): JSX.Element => {
  const [selectedTable, setSelectedTable] = useState<TableModel>();
  const [tables, setTables] = useState<TableModel[]>([]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      console.log("Clicked target :", event.target);

      if (!(event.target as HTMLElement).hasAttribute("data-table")) {
        setSelectedTable(undefined);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleSelectedTable = (table: TableModel) => {
    setSelectedTable(table);
  }

  const addTable = (newTable: TableModel) => {
    setTables([...tables, newTable])
  }

  return (
    <div className={styles.landing}>
      <Sidebar selectedTable={selectedTable} />
      <div className={styles.vertical}>
        <Topbar addTable={addTable} />
        <Main tables={tables} handleSelectedTable={handleSelectedTable} />
      </div>
    </div>
  )
}

export default Landing;
