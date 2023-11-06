
// React
import type { Dispatch, SetStateAction } from "react";

// Internal
import styles from './index.module.scss';

interface InputProps {
  /** The label of the input. */
  label: string,
  /** The placeholder text of the input. */
  placeholder: string,
  /** The controlled value of the input. */
  value: string,
  /** The function to call when the input changes. */
  onChange: Dispatch<SetStateAction<string>>,
}

const Input = ({ label, placeholder, value, onChange }: InputProps) => {
  return (
    <div className={styles.input}>
      <label className={styles.label} htmlFor={label}>{label}</label>
      <input
        className={styles.field}
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        required
      />
    </div>
  )
}

export default Input;
