
// React
import { useContext } from 'react';

// Internal
import styles from './index.module.scss';
import TablesContext from '@contexts/TablesContext';

/** A sidebar tool for editing tables. */
const Topbar = (): JSX.Element => {
  const { tables } = useContext(TablesContext);

  /** The URL ending with a file to download. */
  const download = (url: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = url!.split("/").at(-1)!;
    link.click();
  }

  const handleExport = async (): Promise<void> => {
    const url = '/api/export';
    const init: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: JSON.stringify(tables),
        filename: 'db'
      }),
    }

    const response = await fetch(url, init);
    const { filename, message } = await response.json();

    if (!filename) {
      return alert(message);
    }

    download(`${process.env.NEXT_PUBLIC_WEBAPP_URL}/export/${filename}`);
  }

  return (
    <div className={styles.topbar}>
      <button onClick={handleExport} disabled={tables.length === 0}>Export</button>
    </div>
  )
}

export default Topbar;
