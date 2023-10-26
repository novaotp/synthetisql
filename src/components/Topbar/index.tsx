
// React
import { useContext, useRef } from 'react';

// Internal
import styles from './index.module.scss';

/// -- Models -- ///
import IndexedTableModel from '@models/table';

/// -- Libs -- ///
import TablesContext from '@contexts/TablesContext';

/// -- Utils -- ///
import Transfer from '@utils/transfer';

/** A sidebar tool for editing tables. */
const Topbar = (): JSX.Element => {
  const { tables, setTables } = useContext(TablesContext);
  const importRef = useRef<HTMLInputElement>(null);

  const handleExport = async (): Promise<void> => {
    const { file, message } = await Transfer.store(tables, 'db', 'synmodel');

    if (!file) {
      return alert(message);
    }

    Transfer.download(`${process.env.NEXT_PUBLIC_WEBAPP_URL}/export`, file);
  }

  const handleImport = async (): Promise<void> => {
    const files = importRef.current!.files;

    if (!files) return;

    setTables(JSON.parse(await Transfer.load(files[0])) as IndexedTableModel[]);
  }

  return (
    <div className={styles.topbar}>
      <button onClick={handleExport} disabled={tables.length === 0}>Export</button>
      <input ref={importRef} type="file" accept=".synmodel" onChange={handleImport} />
    </div>
  )
}

export default Topbar;
