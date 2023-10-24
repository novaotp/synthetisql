
/** All the row type options. */
const rowTypeOptions = ["VARCHAR", "TEXT", "INT", "BOOL"] as const;

// Common properties shared by all row models
interface BaseRowModel {
  name: string;
  primaryKey?: boolean;
  notNull?: boolean;
  unique?: boolean;
  check?: string;
  default?: string;
  onUpdate?: string;
  onDelete?: string;
  comment?: string;
}

// Specific properties for VARCHAR and TEXT types
interface StringRowModel extends BaseRowModel {
  type: "VARCHAR" | "TEXT";
  precision?: number;
  foreignKey?: string;
}

// Specific properties for INT type
interface IntRowModel extends BaseRowModel {
  type: "INT";
  autoIncrement?: boolean;
  foreignKey?: string;
}

// Specific properties for BOOL type
interface BoolRowModel extends BaseRowModel {
  type: "BOOL";
}

// Union type for all row models
type RowModel = StringRowModel | IntRowModel | BoolRowModel;

/** A row model with a unique ID. */
interface IndexedRowModel {
  /** The unique ID of the row */
  id: string,
  /** The row itself. */
  row: RowModel,
}

export { rowTypeOptions };
export type { RowModel, StringRowModel, IntRowModel, BoolRowModel };
export default IndexedRowModel;
