
/** All the type options. */
const typeModels = ["VARCHAR", "TEXT", "INT", "BOOL"] as const;
/** A specific type option. */
type TypeModel = typeof typeModels[number];

interface RowModel {
  name: string,
  type: TypeModel,
  precision?: number,
  primaryKey?: boolean,
  autoIncrement?: boolean,
  notNull?: boolean,
  foreignKey?: string,
  unique?: boolean,
  check?: string,
  default?: string,
  onUpdate?: string,
  onDelete?: string,
  comment?: string,
}

class RowModelImpl {
  /** Returns a default `RowModel` object. */
  public static default(): RowModel {
    return {
      name: "New Row",
      type: "VARCHAR",
      precision: 0,
      primaryKey: false,
      autoIncrement: false,
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

/** A row model with an ID. */
interface IndexedRowModel {
  /** The unique ID of the row. */
  index: number,
  /** The row itself. */
  row: RowModel,
}

interface TableModel {
  name: string,
  rows: IndexedRowModel[],
}

class TableModelImpl {
  /** Returns a default `TableModel` object. */
  public static default(): TableModel {
    return {
      name: "New Table",
      rows: []
    };
  }
}

/** A table model with an ID. */
interface IndexedTableModel {
  /** The unique ID of the table */
  index: number,
  /** The table itself. */
  table: TableModel,
}

export { typeModels, RowModelImpl, TableModelImpl };
export type { IndexedTableModel, IndexedRowModel, RowModel, TypeModel };
export default TableModel;
