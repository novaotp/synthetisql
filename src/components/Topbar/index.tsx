
// React
import { useContext } from 'react';

// Internal
import styles from './index.module.scss';
import TablesContext from '@contexts/TablesContext';

/** A sidebar tool for editing tables. */
const Topbar = (): JSX.Element => {
  const { addTable } = useContext(TablesContext);

  return (
    <div className={styles.topbar}>
      <button onClick={() => addTable()}>Add a new table !</button>
    </div>
  )
}

export default Topbar;
