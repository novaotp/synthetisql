
type Impossible = "%%IMPOSSIBLE%%";

/** All the row type options. */
const rowTypes = ["VARCHAR", "TEXT", "INT", "BOOL"] as const;

/** The type of the row */
type RowType = typeof rowTypes[number];

/**
 * Common properties shared by all row models.
 * 
 * Use it to extend more specific row models.
 */
interface RowModelBlueprint {
  name: string;
  type: RowType;
  precision: number | null | Impossible,
  primaryKey: boolean;
  foreignKey: string | Impossible,
  autoIncrement: boolean | Impossible;
  notNull: boolean;
  unique: boolean;
  check?: string;
  default?: string;
  onUpdate?: string;
  onDelete?: string;
  comment?: string;
}

/** Specific properties for a row with type `VARCHAR` or `TEXT`. */
interface StringRowModel extends RowModelBlueprint {
  type: "VARCHAR" | "TEXT";
  precision: number | null;
  autoIncrement: Impossible,
  foreignKey: string;
}

/** Specific properties for a row with type `INT`. **/
interface IntRowModel extends RowModelBlueprint {
  type: "INT";
  precision: Impossible,
  autoIncrement: boolean;
  foreignKey: string;
}

/** Specific properties for a row with type `BOOL`. */
interface BoolRowModel extends RowModelBlueprint {
  type: "BOOL";
  precision: Impossible;
  autoIncrement: Impossible,
  foreignKey: Impossible;
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

export { rowTypes };
export type { RowModel, RowType };
export default IndexedRowModel;
