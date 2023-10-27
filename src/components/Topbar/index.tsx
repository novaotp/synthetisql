
// React
import { useContext, useRef } from 'react';

// Internal
import styles from './index.module.scss';

/// -- Models -- ///
import IndexedTableModel from '@models/table';

/// -- Libs -- ///
import TablesContext from '@contexts/TablesContext';

/// -- Utils -- ///
import { store, download, load } from '@utils/transfer';

/** A sidebar tool for editing tables. */
const Topbar = (): JSX.Element => {
  const { tables, setTables } = useContext(TablesContext);
  const importRef = useRef<HTMLInputElement>(null);

  const handleExport = async (): Promise<void> => {
    const { filename, message } = await store({ path: 'public/export', data: tables, filename: 'db.synmodel' });

    if (!filename) {
      return alert(message);
    }

    download('export', filename);
  }

  const handleImport = async (): Promise<void> => {
    const files = importRef.current!.files;

    if (!files) return;

    const newTables: IndexedTableModel[] = JSON.parse(await load(files[0]));

    let response = true;
    if (tables.length > 0) {
      response = window.confirm('Are you sure you want to overwrite the existing tables ?');
    }

    if (response) {
      setTables(newTables);
    }
  }

  return (
    <div className={styles.topbar}>
      <div className={styles.fileOperations}>
        <button className={`${styles.export} ${styles.item}`} onClick={handleExport}>Export</button>
        <input className={styles.hiddenFileInput} type="file" ref={importRef} onChange={handleImport} accept=".synmodel" />
        <input className={`${styles.import} ${styles.item}`} type="button" value="Import" onClick={() => importRef.current!.click()} />
      </div>
      <div></div> {/** Placeholder for center data such as diagram's name. */}
      <div></div> {/** Placeholder for profile data when auth added. */}
    </div>
  )
}

export default Topbar;
