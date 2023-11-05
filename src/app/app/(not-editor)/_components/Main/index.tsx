
import styles from './index.module.scss';
import { ChildrenProps } from '@/app/_interfaces';

export const Main = ({ children }: ChildrenProps): JSX.Element => {
  return (
    <main className={styles.main}>
      {children}
    </main>
  )
}
