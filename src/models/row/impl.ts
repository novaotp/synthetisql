
import { RowModel } from "./index";

/**
 * The row's implmentation. Contains useful methods.
 * @class
 */
class Row {
  /** Returns a default `RowModel` object. */
  public static default(): RowModel {
    return {
      name: "New Row",
      type: "VARCHAR",
      precision: null,
      primaryKey: false,
      foreignKey: "",
      autoIncrement: "%%IMPOSSIBLE%%",
      notNull: false,
      unique: false,
      check: "",
      default: "",
      onUpdate: "",
      onDelete: "",
      comment: "",
    };
  }
}

export default Row;