
import { TableModel } from "./index";

class TableModelImpl {
  /** Returns a default `TableModel` object. */
  public static default(): TableModel {
    return {
      name: "New Table",
      rows: []
    };
  }
}

export default TableModelImpl;
