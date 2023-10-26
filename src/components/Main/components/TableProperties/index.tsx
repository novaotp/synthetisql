
// React
import { useState, type RefObject, useContext } from 'react';

// Internal
import styles from './index.module.scss';
import TabLabel from './types';

/// -- Components -- ///
import Body, { Action, Tab } from './components';

/// -- Libs -- ///
import TablesContext from '@contexts/TablesContext';

interface TablePropertiesProps {
  /** The table's ref. */
  dialogRef: RefObject<HTMLDialogElement>,
  /** The function to close the table properties. */
  close: () => void,
}

const TableProperties = ({ dialogRef, close }: TablePropertiesProps): JSX.Element => {
  const { selectedTable, deleteTable } = useContext(TablesContext);
  const [activeTab, setActiveTab] = useState<TabLabel>("General");

  const handleSave = () => { };
  const handleCancel = () => close();

  const handleDelete = () => {
    deleteTable(selectedTable);
    close();
  }

  return (
    <dialog ref={dialogRef} className={styles.dialog}>
      {
        !selectedTable
          ? <p>No table selected...</p> // This scenario shouldn't happen, but just in case...
          : (
            <>
              <ul className={styles.header}>
                <Tab label="General" activeTab={activeTab} setActiveTab={setActiveTab} />
                <Tab label="Columns" activeTab={activeTab} setActiveTab={setActiveTab} />
              </ul>
              <Body activeTab={activeTab} />
              <ul className={styles.footer}>
                <Action label="Delete" onClick={handleDelete} type='danger' />
                <Action label="Cancel" onClick={handleCancel} type='cancel' />
                <Action label="Save" onClick={handleSave} type='success' />
              </ul>
            </>
          )
      }
    </dialog>
  )
}

export default TableProperties;
