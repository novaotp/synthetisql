
// React
import { type Dispatch, type SetStateAction, createContext } from "react";

// Internal
import IndexedTableModel, { TableModel } from "@models/table";

interface TablesContextProps {
  /** The currently selected indexed table. */
  selectedTable: IndexedTableModel | undefined;
  /** Sets a new selected table or `undefined`. */
  setSelectedTable: Dispatch<SetStateAction<IndexedTableModel | undefined>>;
  /** The list of the indexed tables. */
  tables: IndexedTableModel[],
  /** The setter for the list of the indexed tables. */
  setTables: Dispatch<SetStateAction<IndexedTableModel[]>>,
  /**
   * Adds a new table to the list of tables.
   * @param table The table to add
   */
  addTable: (table?: TableModel) => void,
  /**
   * Updates a table in the list of tables.
   * @param table The indexed table to update
   */
  updateTable: (table: IndexedTableModel) => void,
}

const TablesContext = createContext<TablesContextProps>({} as TablesContextProps);

export default TablesContext;
