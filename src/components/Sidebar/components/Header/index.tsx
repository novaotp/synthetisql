
// MUI Icons
import AddRoundedIcon from '@mui/icons-material/AddRounded';

// Internal
import styles from './index.module.scss';
import IndexedTableModel from '@models/table';

interface HeaderProps {
  /** The currently selected table. */
  selectedTable: IndexedTableModel,
  /**
   * Changes the name of the currently selected indexed table.
   * @param name The new name of the selected indexed table.
   */
  changeName: (name: string) => void,
  /** Adds a new row with a unique ID. */
  handleAddRow: () => void
}

const Header = ({ selectedTable, changeName, handleAddRow }: HeaderProps) => {
  return (
    <div className={styles.header}>
      <input
        className={styles.name}
        type="text"
        value={selectedTable.table.name}
        onChange={(event) => changeName(event.target.value)}
      />
      <button
        onClick={handleAddRow}
        className={styles.addRow}
      >
        <AddRoundedIcon />
      </button>
    </div>
  )
}

export default Header;
