
"use client";

// React
import { useState } from "react";

// Internal
import TableModel, { IndexedTableModel, TableModelImpl } from "@models/tables";

interface UseTableReturnProps {
  /** The list of the existing indexed tables. */
  tables: IndexedTableModel[],
  /**
   * Adds a new table with a unique ID to the list of indexed tables.
   * @param table The table to add. If not provided, a new {@link TableModelImpl | default table } will be created.
   * @see {@link TableModel | The table model}
   */
  addTable: (table?: TableModel) => void,
  /**
   * Updates an existing table in the list of indexed tables.
   * @param indexedTable The indexed table to add.
   * @see {@link IndexedTableModel | The indexed table model }
   */
  updateTable: (indexedTable: IndexedTableModel) => void,
}

/**
 * A hook for :
 * - getting all the indexed tables
 * - adding a new table
 * - updating an existing table
 */
const useTables = (): UseTableReturnProps => {
  const [index, setIndex] = useState<number>(0);
  const [tables, setTables] = useState<IndexedTableModel[]>([]);

  const addTable = (table: TableModel = TableModelImpl.default()) => {
    setTables([...tables, { index: index, table }]);
    setIndex(prevIndex => prevIndex + 1);

    console.log("Table count: " + tables.length);
  }

  const updateTable = (indexedTable: IndexedTableModel) => {
    setTables(tables.map(table => table.index === indexedTable.index ? indexedTable : table));
  }  

  return { tables, addTable, updateTable };
}

export default useTables;
