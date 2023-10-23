
// MUI Icons
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

// React
import { useState } from 'react';

// Internal

/// -- Styling -- ///
import styles from './index.module.scss';

/// -- Hooks -- ///
import useSelectedTable from '@hooks/useSelectedTable';
import useTables from '@hooks/useTables';

/// -- Models -- ///
import { IndexedRowModel, RowModelImpl, RowModel, typeModels } from '@models/tables';

/** A sidebar tool for tables. */
const Sidebar = (): JSX.Element => {
  const { selectedTable, changeName } = useSelectedTable();
  const { updateTable } = useTables();
  const [openedRowIndex, setOpenedRowIndex] = useState<number>(-1);

  /** Adds a new row with a unique ID. */
  const handleAddRow = (): void => {
    if (!selectedTable) return;

    /** Generates a unique ID. */
    const uniqueRowIndex = (): number => {
      let highestRowIndex = -1;
      selectedTable.table.rows.forEach(row => {
        if (row.index > highestRowIndex) {
          highestRowIndex = row.index;
        }
      });

      return highestRowIndex + 1;
    }

    const defaultRow: IndexedRowModel = {
      index: uniqueRowIndex(),
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
  const handleRowChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, index: number, key: keyof RowModel): void => {
    if (!selectedTable) return;

    /** @ts-ignore ts(2322) */
    selectedTable
      .table
      .rows
      .find(row => row.index === index)!
      .row[key] = event.target.value;

    updateTable(selectedTable);
  }

  if (!selectedTable) return <p>Select a table to get started.</p>; 

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
        selectedTable.table.rows.map(({ index, row }) => {
          const { name, type, precision } = row;

          return (
            <div key={index} className={styles.row}>
              <div className={styles.defaultVisible}>
                <input
                  type="text"
                  value={name}
                  onChange={(event) => handleRowChange(event, index, 'name')}
                />
                <button
                  type="button"
                  className={styles.more}
                  onClick={() => {
                    if (index === openedRowIndex) {
                      return setOpenedRowIndex(-1);
                    }
                    
                    setOpenedRowIndex(index);
                  }}
                >
                  <KeyboardArrowDownRoundedIcon />
                </button>
              </div>
              <div className={`${styles.defaultUnvisible} ${openedRowIndex === index ? styles.active : ''}`}>
                <div>
                  <label htmlFor='type'>Type</label>
                  <select
                    defaultValue={type}
                    name="type"
                    onChange={(event) => handleRowChange(event, index, 'type')}
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
                <div>
                  <label htmlFor='precision'>Précision</label>
                  <input
                    defaultValue={precision}
                    name="precision"
                    onChange={(event) => handleRowChange(event, index, 'precision')}
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
