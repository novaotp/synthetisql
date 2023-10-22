
import TableModel from '@models/tables';
import styles from './index.module.scss';

interface TopbarProps {
  /** Adds a new table. */
  addTable: (newTable: TableModel) => void;
}

/** A sidebar tool for tables. */
const Topbar = ({ addTable }: TopbarProps): JSX.Element => {
  const handleOnClick = () => {
    const defaultTable: TableModel = {
      name: "New Table"
    };

    addTable(defaultTable);
  }

  return (
    <div className={styles.topbar}>
      <button onClick={handleOnClick}>Add a new table !</button>
    </div>
  )
}

export default Topbar;
