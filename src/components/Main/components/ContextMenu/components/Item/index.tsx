
import styles from './index.module.scss';

interface ItemProps {
  /** The displayed label for the item. */
  label: string,
  /** An optional onClick event handler. */
  onClick?: (event?: React.MouseEvent) => void,
}

/** A single item for the context menu. */
const Item = ({ label, onClick }: ItemProps) => {
  return (
    <li className={styles.listItem}>
      <button className={styles.button} onClick={onClick}>{label}</button>
    </li>
  )
}

export default Item;
