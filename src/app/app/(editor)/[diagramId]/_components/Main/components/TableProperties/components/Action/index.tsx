
import styles from './index.module.scss';

interface ButtonProps {
  /** The label of the button. */
  label: string,
  /** The onClick handler of the button. */
  onClick: () => void,
  /** The type of action. */
  type: "success" | "danger" | "cancel",
}

const Button = ({ label, onClick, type }: ButtonProps): JSX.Element => {
  return (
    <li className={styles.action} data-button-type={type}>
      <button className={styles.button} onClick={onClick}>
        {label}
      </button>
    </li>
  )
}

export default Button;
