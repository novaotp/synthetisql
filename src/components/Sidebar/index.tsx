
// MUI Icons
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

// React
import { useState } from 'react';

// Internal

/// -- Styling -- ///
import styles from './index.module.scss';

/// -- Models -- ///
import { IndexedRowModel, RowModelImpl, RowModel, typeModels, IndexedTableModel } from '@models/tables';

/// -- Utils -- ///
import uniqueId from '@utils/uniqueId';

interface SidebarProps {
  /** The index of the selected table. */
  selectedTable: IndexedTableModel | undefined,
  /** Updates a table in the list of tables. */
  updateTable: (table: IndexedTableModel) => void
}

/** A sidebar tool for tables. */
const Sidebar = ({ selectedTable, updateTable }: SidebarProps): JSX.Element => {
  const [openedRowId, setOpenedRowId] = useState<string>("");

  /**
   * Changes the name of the currently selected indexed table.
   * @param name The new name of the selected indexed table.
   */
  const changeName = (name: string): void => {
    if (!selectedTable) return;

    selectedTable.table.name = name;
    updateTable(selectedTable);
  }

  /** Adds a new row with a unique ID. */
  const handleAddRow = (): void => {
    if (!selectedTable) return;

    const defaultRow: IndexedRowModel = {
      id: uniqueId(),
      row: RowModelImpl.default()
    }

    selectedTable.table.rows.push(defaultRow);
    updateTable(selectedTable);
  }

  /**
   * Updates the value of a given key of a given row (via its index).
   * @param event The onChange event
   * @param index The index of the row to update
   * @param key The key of the property to update in the row
   */
  const handleRowChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, id: string, key: keyof RowModel): void => {
    if (!selectedTable) return;

    /** @ts-ignore ts(2322) */
    selectedTable
      .table
      .rows
      .find(row => row.id === id)!
      .row[key] = event.target.value;

    updateTable(selectedTable);
  }

  if (!selectedTable) {
    return (
      <div className={styles.sidebar}>
        <p>Select a table to get started.</p>
      </div>
    )
  }

  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <input
          className={styles.name}
          type="text"
          value={selectedTable.table.name}
          onChange={(event) => changeName(event.target.value)}
        />
        <button
          onClick={handleAddRow}
          className={styles.addRow}
        >
          <AddRoundedIcon />
        </button>
      </div>
      {
        selectedTable.table.rows.map(({ id, row }) => {
          const { name, type, precision } = row;

          return (
            <div key={id} className={styles.row}>
              <div className={styles.defaultVisible}>
                <input
                  type="text"
                  value={name}
                  onChange={(event) => handleRowChange(event, id, 'name')}
                />
                <button
                  type="button"
                  className={styles.more}
                  onClick={() => {
                    if (id === openedRowId) {
                      return setOpenedRowId("");
                    }
                    
                    setOpenedRowId(id);
                  }}
                >
                  <KeyboardArrowDownRoundedIcon />
                </button>
              </div>
              <div className={`${styles.defaultUnvisible} ${openedRowId === id ? styles.active : ''}`}>
                <div className={styles.prop}>
                  <label htmlFor='type'>Type</label>
                  <select
                    defaultValue={type}
                    name="type"
                    onChange={(event) => handleRowChange(event, id, 'type')}
                  >
                    {
                      typeModels.map((typeModel, index) => {
                        return (
                          <option
                            key={index}
                            value={typeModel}
                          >
                            {typeModel}
                          </option>
                        )
                      })
                    }
                  </select>
                </div>
                <div className={styles.prop}>
                  <label htmlFor='precision'>Précision</label>
                  <input
                    defaultValue={precision}
                    name="precision"
                    onChange={(event) => handleRowChange(event, id, 'precision')}
                  />
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default Sidebar;
