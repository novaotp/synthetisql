
interface Row {
  name: string,
  type: string,
  precision: number,
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

interface TableModel {
  name: string,
  rows?: Row[],
}

type IndexedTableModel = {
  index: number,
  table: TableModel,
}

export type { IndexedTableModel };
export default TableModel;
