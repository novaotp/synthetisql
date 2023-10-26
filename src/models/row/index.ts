
/** All the row type options. */
const rowTypes = ["VARCHAR", "TEXT", "INT", "BOOL"] as const;

/** The type of the row */
type RowType = typeof rowTypes[number];

/** A key in the row model. */
type RowModelKey = keyof RowModel;

/** The properties of a row. */
interface RowModel {
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
