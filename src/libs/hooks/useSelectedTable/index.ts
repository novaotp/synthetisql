
"use client";

// React
import { useState, type SetStateAction, type Dispatch } from "react";

// Internal
import { IndexedTableModel } from "@models/tables";
import useTables from "../useTables";

interface UseSelectedTableReturnProps {
  /** The currently selected indexed table or `undefined`. */
  selectedTable: IndexedTableModel | undefined,
  /** Sets the selected indexed table to a new indexed table or `undefined`. */
  setSelectedTable: Dispatch<SetStateAction<IndexedTableModel | undefined>>,
  /**
   * Changes the name of the currently selected indexed table.
   * @param name The new name of the selected indexed table.
   */
  changeName: (name: string) => void,
}

/** A hook for getting and setting the currently selected table. */
const useSelectedTable = (): UseSelectedTableReturnProps => {
  const [selectedTable, setSelectedTable] = useState<IndexedTableModel | undefined>(undefined);
  const { updateTable } = useTables();

  /**
   * Changes the name of the currently selected indexed table.
   * @param name The new name of the selected indexed table.
   */
  const changeName = (name: string): void => {
    if (!selectedTable) return;

    selectedTable.table.name = name;
    updateTable(selectedTable);
  }

  return { selectedTable, changeName, setSelectedTable };
}

export default useSelectedTable;
