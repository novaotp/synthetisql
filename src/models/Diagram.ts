import type { IndexedTableModel } from "./Table";

export interface Diagram {
  id: number,
  title: string,
  data: IndexedTableModel[],
  created_at: Date,
  updated_at: Date
}
