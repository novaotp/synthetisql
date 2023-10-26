
// React
import { useContext } from 'react';

// Internal
import styles from './index.module.scss';
import TablesContext from '@contexts/TablesContext';
import { useRouter } from 'next/navigation';

/** A sidebar tool for editing tables. */
const Topbar = (): JSX.Element => {
  const { tables } = useContext(TablesContext);
  const router = useRouter();

  const handleExport = async (): Promise<void> => {
    let data = "";

    tables.forEach((table) => {
      data += JSON.stringify(table) + "\n";
    });

    fetch('/api/export', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: data,
        filename: 'db'
      }),
    });
  }

  return (
    <div className={styles.topbar}>
      <button onClick={handleExport} disabled={tables.length === 0}>Export</button>
    </div>
  )
}

export default Topbar;
