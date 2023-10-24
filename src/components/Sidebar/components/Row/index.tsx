
// MUI Icons
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

// React
import { Dispatch, SetStateAction } from 'react';

// Internal
import styles from './index.module.scss';
import { RowModel, RowModelKey, RowType, rowTypes } from '@models/row';
import RowImpl from '@models/row/impl';

interface RowProps {
  /** The unique ID of the row. */
  id: string,
  /** The row's properties to render. */
  row: RowModel,
  /** The currently opened row. */
  openedRowId: string,
  /** Updates the currently opened row. */
  setOpenedRowId: Dispatch<SetStateAction<string>>,
  /**
   * Updates the value of a given key of a given row (via its index).
   * @param rowId The index of the row to update
   * @param key The key of the property to update in the row
   * @param value The new value of the property
   */
  changeRow: (rowId: string, key: RowModelKey, value: any) => void,
}

/** Renders a row in the table. */
const Row = ({ id, row, openedRowId, setOpenedRowId, changeRow }: RowProps) => {
  return (
    <div className={styles.row}>
      <div className={styles.defaultVisible}>
        <input
          type="text"
          value={row.name}
          onChange={(event) => changeRow(id, 'name', event.target.value)}
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
            defaultValue={row.type}
            name="type"
            onChange={(event) => {
              const newValue = event.target.value as RowType;

              changeRow(id, 'type', event.target.value);

              if (newValue === "INT" || newValue === "BOOL") {
                changeRow(id, 'precision', null);
              }
            }}
          >
            {
              rowTypes.map((rowType, index) => {
                return (
                  <option
                    key={index}
                    value={rowType}
                  >
                    {rowType}
                  </option>
                )
              })
            }
          </select>
        </div>
        <div className={styles.prop}>
          <label htmlFor='precision'>Précision</label>
          <input
            placeholder='Précision ici...'
            value={row.precision ?? ""}
            name="precision"
            onChange={(event) => changeRow(id, 'precision', event.target.value)}
            disabled={row.type === "INT" || row.type === "BOOL"}
          />
        </div>
      </div>
    </div>
  )
}

export default Row;
