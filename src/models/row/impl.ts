
import { RowModel } from "./index";

class RowModelImpl {
  /** Returns a default `RowModel` object. */
  public static default(): RowModel {
    return {
      name: "New Row",
      type: "VARCHAR",
      precision: 255,
      primaryKey: false,
      notNull: false,
      foreignKey: "",
      unique: false,
      check: "",
      default: "",
      onUpdate: "",
      onDelete: "",
      comment: "",
    };
  }
}

export default RowModelImpl;
