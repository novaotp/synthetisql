
import styles from './index.module.scss';
import useTables from '@hooks/useTables';

/** A sidebar tool for editing tables. */
const Topbar = (): JSX.Element => {
  const { addTable } = useTables();

  return (
    <div className={styles.topbar}>
      <button onClick={() => addTable()}>Add a new table !</button>
    </div>
  )
}

export default Topbar;
