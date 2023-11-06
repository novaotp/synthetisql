
import styles from './index.module.scss';

interface SubmitParams {
  label: string
}

export const Submit = ({ label }: SubmitParams): JSX.Element => {
  return (
    <button type="submit" className={styles.button}>
      {label}
    </button>
  )
}
