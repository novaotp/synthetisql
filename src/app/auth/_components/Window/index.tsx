
// React
import { type ReactNode } from 'react';

// Internal
import styles from './index.module.scss';

interface WindowParams {
  children: ReactNode,
}

export const Window = ({ children }: WindowParams): JSX.Element => {
  return (
    <div className={styles.window}>
      {children}
    </div>
  )
}
