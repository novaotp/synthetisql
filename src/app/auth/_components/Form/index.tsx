
// React
import { FormEvent, type ReactNode } from 'react';

// Internal
import styles from './index.module.scss';

interface FormParams {
  onSubmit: (event: FormEvent) => void,
  children: ReactNode,
}

export const Form = ({ onSubmit, children }: FormParams): JSX.Element => {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      {children}
    </form>
  )
}
