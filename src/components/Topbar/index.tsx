
import styles from './index.module.scss';

/** A sidebar tool for editing tables. */
const Topbar = ({ addTable }: any): JSX.Element => {
  return (
    <div className={styles.topbar}>
      <button onClick={() => addTable()}>Add a new table !</button>
    </div>
  )
}

export default Topbar;
