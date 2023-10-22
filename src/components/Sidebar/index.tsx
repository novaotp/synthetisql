
import TableModel from '@models/tables';
import styles from './index.module.scss';

interface SidebarProps {
  /** The selected table. */
  selectedTable: TableModel | undefined;
}

/** A sidebar tool for tables. */
const Sidebar = ({ selectedTable }: SidebarProps): JSX.Element => {
  return (
    <div className={styles.sidebar}>
      { selectedTable
          ? <p>Selected table name : {selectedTable.name}</p>
          : <p>Select a table to get started.</p>
    }
    </div>
  )
}

export default Sidebar;
