
import TableModel from '@models/tables';
import styles from './index.module.scss';
import Table from '../Table';

interface MainProps {
  /** The tables to display. */
  tables: TableModel[];
  /** The function to handle the selected table. */
  handleSelectedTable: (table: TableModel) => void;
}

const Main = ({ tables, handleSelectedTable }: MainProps): JSX.Element => {
  return (
    <div className={styles.main}>
      {
        tables.map((table, index) => (
          <Table
            key={index}
            table={table}
            handleSelectedTable={handleSelectedTable}
          />
        ))
      }
    </div>
  )
}

export default Main;
