
// React + Next
import { useContext, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Internal
import styles from './index.module.scss';
import LogoSynthetiSQL from '/public/logo_transparent_text_right.png';

/// -- Models -- ///
import { IndexedTableModel } from '@models/table';

/// -- Libs -- ///
import TablesContext from '@contexts/TablesContext';

/// -- Utils -- ///
import { store, load, download, discard } from '@utils/transfer';

/** A sidebar tool for editing tables. */
const Topbar = (): JSX.Element => {
  const { tables, setTables } = useContext(TablesContext);
  const importRef = useRef<HTMLInputElement>(null);

  const handleExport = async (): Promise<void> => {
    const filename = await store('public/export', 'db.synmodel', tables);

    if (!filename) {
      return alert("An error occurred while exporting the file.");
    }

    download('export', filename);
    await discard('public/export', filename);
  }

  const isValidModelFormat = (model: any[]): boolean => {
    for (const indexedTable of model) {
      if (indexedTable.id === undefined) {
        return false;
      }

      if (!("x" in indexedTable.position && "y" in indexedTable.position)) {
        return false;
      }

      if (!("name" in indexedTable.table)) {
        return false;
      }

      for (const indexedRow of indexedTable.table.rows) {
        if (indexedRow.id !== undefined) {
          return false;
        }

        if (!("name" in indexedRow.row &&
            "type" in indexedRow.row &&
            "precision" in indexedRow.row &&
            "primaryKey" in indexedRow.row &&
            "foreignKey" in indexedRow.row &&
            "autoIncrement" in indexedRow.row &&
            "notNull" in indexedRow.row &&
            "unique" in indexedRow.row &&
            "check" in indexedRow.row &&
            "default" in indexedRow.row &&
            "onUpdate" in indexedRow.row &&
            "onDelete" in indexedRow.row &&
            "comment" in indexedRow.row
        )) {
          return false;
        }
      }
    }

    return true;
  }

  const handleImport = async (): Promise<void> => {
    const files = importRef.current!.files;

    if (!files) return;
    
    let data = await load(files[0]) as any;

    try {
      data = JSON.parse(data);
    } catch {
      alert("File is not parsable");
      return;
    }

    if (!isValidModelFormat(data)) {
      alert("Invalid file format");
      return;
    }

    const newTables: IndexedTableModel[] = data;

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
      <div className={styles.segment}>
        <Link className={styles.link} href="/">
          <Image
            src={LogoSynthetiSQL}
            alt="Logo SynthetiSQL"
            height="40"
            width="160"
          />
        </Link>
      </div>
      <div className={`${styles.fileOperations} ${styles.segment}`}>
        <button className={`${styles.export} ${styles.item}`} onClick={handleExport}>Export</button>
        <input className={styles.hiddenFileInput} type="file" ref={importRef} onChange={handleImport} accept=".synmodel" />
        <input className={`${styles.import} ${styles.item}`} type="button" value="Import" onClick={() => importRef.current!.click()} />
      </div>
      <div className={styles.segment}></div> {/** Placeholder for profile data when auth added. */}
    </div>
  )
}

export default Topbar;
