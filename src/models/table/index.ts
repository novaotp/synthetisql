
import IndexedRowModel from "../row";

interface TableModel {
  name: string,
  rows: IndexedRowModel[],
}

/** A table model with a unique ID. */
interface IndexedTableModel {
  /** The unique ID of the table */
  id: string,
  /** The table itself. */
  table: TableModel,
}

export type { TableModel };
export default IndexedTableModel;
