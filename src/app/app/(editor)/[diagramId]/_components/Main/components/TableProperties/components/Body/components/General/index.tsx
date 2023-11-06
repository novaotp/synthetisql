
import { useState } from 'react';
import Input from '../shared/fields/Input';
import styles from './index.module.scss';

const General = (): JSX.Element => {
  const [tableName, setTableName] = useState<string>("");

  return (
    <ul className={styles.wrapper}>
      <Input
        label='Table Name'
        placeholder='Enter the table name here...'
        value={tableName}
        onChange={setTableName}
      />
    </ul>
  )
}

export default General;
