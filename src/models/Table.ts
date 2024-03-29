import type { IndexedRowModel } from "./Row";

export interface TablePosition {
    x: number,
    y: number,
}

export interface TableModel {
    name: string,
    rows: IndexedRowModel[],
}

/** A table model with a unique ID. */
export interface IndexedTableModel {
    /** The unique ID of the table */
    id: string,
    /** The table itself. */
    table: TableModel,
    /** The position of the table. */
    position: TablePosition,
}
