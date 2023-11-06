
"use client";

// React + Next + UUID
import { useState, useEffect, useRef } from 'react';
import { useParams } from "next/navigation";
import { getCookie } from 'cookies-next';
import { v4 as uuidv4 } from 'uuid';

// Internal

/// -- Styling -- ///
import styles from './page.module.scss';
import { fetchDiagram } from './server';

/// -- Components -- ///
import { Main, Topbar } from './_components';

/// -- Models -- ///
import Table, { IndexedTableModel, TableModel } from '@models/table';

/// -- Libs -- ///
import TablesContext from '@libs/contexts/TablesContext';

export const Editor = () => {
  const diagramId = Number(useParams()['diagramId'] as string);
  const mainRef = useRef<HTMLDivElement>(null);
  const [selectedTable, setSelectedTable] = useState<IndexedTableModel | undefined>(undefined);
  const [tables, setTables] = useState<IndexedTableModel[]>([]);
  const [title, setTitle] = useState<string>("");

  /**
   * Adds a new table to the list of tables.
   * @param table The table to add
   */
  const addTable = (table: TableModel = Table.default()) => {
    setTables((prevTables: IndexedTableModel[]) => [...prevTables, { id: uuidv4(), table, position: { x: 0, y: 0 } }])
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

  useEffect(() => {
    (async () => {
      const diagram = await fetchDiagram(diagramId, getCookie('id')?.toString()!);

      if (!diagram) {
        alert('Could not load diagram');
        return;
      }

      setTables(diagram.data);
      setTitle(diagram.title);
    })();
  }, []);

  return (
    <TablesContext.Provider value={{ selectedTable, setSelectedTable, tables, setTables, addTable, updateTable, deleteTable }}>
      <div className={styles.landing}>
        <Topbar mainRef={mainRef} title={title} setTitle={setTitle} />
        <Main mainRef={mainRef} />
      </div>
    </TablesContext.Provider>
  )
}
