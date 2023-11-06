
// MUI Icons
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

// React
import { Dispatch, SetStateAction } from 'react';

// Internal
import styles from './index.module.scss';
import IndexedRowModel, { RowModel, RowModelKey, rowTypes } from '@/models/row/interfaces';

interface RowProps {
  /** The indexed row to render. */
  indexedRow: IndexedRowModel;
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
const Row = ({ indexedRow: { id, row }, openedRowId, setOpenedRowId, changeRow }: RowProps): JSX.Element => {
  /** Checks if the row supports precision or not. */
  const supportsPrecision = (): boolean => !(row.type === "INT" || row.type === "BOOL");

  /**
   * Changes the precision of the row.
   * @param value The new value ofthe precision
   */
  const changePrecision = (value: string | null | undefined): void => changeRow(id, 'precision', value);

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
              changeRow(id, 'type', event.target.value);

              if (!supportsPrecision()) {
                changePrecision(undefined);
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
          <label htmlFor='precision'>Precision</label>
          <input
            placeholder='Set the precision here...'
            value={row.precision ?? ""}
            name="precision"
            onChange={(event) => changePrecision(event.target.value)}
            disabled={!supportsPrecision()}
          />
        </div>
      </div>
    </div>
  )
}

export default Row;
