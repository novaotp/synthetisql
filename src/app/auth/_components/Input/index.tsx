
// React
import { Dispatch, SetStateAction } from "react";

// Internal
import styles from './index.module.scss';

interface InputParams {
  label: string,
  placeholder: string,
  value: string,
  setValue: Dispatch<SetStateAction<string>>,
  /** Defaults to `text`. */
  type?: "text" | "email" | "password"
}

export const Input = ({ label, placeholder, type = "text", value, setValue }: InputParams): JSX.Element => {
  const name = label.split(" ")[0].toLowerCase();

  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor={name}>{label}</label>
      <input
        className={styles.input}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
        autoComplete="off"
        required
      />
    </div>
  )
}
