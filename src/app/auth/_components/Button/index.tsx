
import styles from './index.module.scss';

interface ButtonParams {
  label: string
}

export const Button = ({ label }: ButtonParams): JSX.Element => {
  return (
    <button type="submit" className={styles.button}>
      {label}
    </button>
  )
}
