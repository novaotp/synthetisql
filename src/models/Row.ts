/** All the row type options. */
export const rowTypes = ["VARCHAR", "TEXT", "INT", "BOOL"] as const;

/** The type of the row */
export type RowType = typeof rowTypes[number];

/** A key in the row model. */
export type RowModelKey = keyof RowModel;

/** The properties of a row. */
export interface RowModel {
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
export interface IndexedRowModel {
  /** The unique ID of the row */
  id: string,
  /** The row itself. */
  row: RowModel,
}
