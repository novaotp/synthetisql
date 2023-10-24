
/** All the row type options. */
const rowTypes = ["VARCHAR", "TEXT", "INT", "BOOL"] as const;

/** The type of the row */
type RowType = typeof rowTypes[number];

/** A key in the row model. */
type RowModelKey = keyof RowModelBlueprint;

/**
 * Common properties shared by all row models.
 * 
 * Use it to extend more specific row models.
 */
interface RowModelBlueprint {
  name: string;
  type: RowType;
  precision: string | null | undefined,
  primaryKey: boolean;
  foreignKey: string | undefined,
  autoIncrement: boolean | undefined;
  notNull: boolean;
  unique: boolean;
  check: string | null;
  default: string | null;
  onUpdate: string | null;
  onDelete: string | null;
  comment: string | null;
}

/** Specific properties for a row with type `VARCHAR` or `TEXT`. */
interface StringRowModel extends RowModelBlueprint {
  type: "VARCHAR" | "TEXT";
  precision: string | null;
  autoIncrement: undefined,
  foreignKey: string;
}

/** Specific properties for a row with type `INT`. */
interface IntRowModel extends RowModelBlueprint {
  type: "INT";
  precision: undefined,
  autoIncrement: boolean;
  foreignKey: string;
}

/** Specific properties for a row with type `BOOL`. */
interface BoolRowModel extends RowModelBlueprint {
  type: "BOOL";
  precision: undefined;
  autoIncrement: undefined,
  foreignKey: undefined;
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
export type { RowModel, RowType, RowModelKey };
export default IndexedRowModel;
