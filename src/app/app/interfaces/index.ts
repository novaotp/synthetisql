
import { IndexedTableModel } from "@/models/table";

export interface Diagram {
  id: number,
  title: string,
  data: IndexedTableModel[],
  created_at: Date,
  updated_at: Date
}
