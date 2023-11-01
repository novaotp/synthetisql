
import { v4 as uuidv4 } from 'uuid';
import IndexedTableModel, { TableModel } from "./interfaces";

class Table {
  /** Returns a default `TableModel` object. */
  public static default(): TableModel {
    return {
      name: "New Table",
      rows: []
    };
  }

  /** Returns a default `IndexedTableModel` object. */
  public static defaultIndex(table: TableModel = this.default()): IndexedTableModel {
    return {
      id: uuidv4(),
      table,
      position: { x: 0, y: 0 }
    };
  }
}

export default Table;
