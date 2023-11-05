
import styles from './index.module.scss';
import { ChildrenProps } from "@/app/_interfaces";

export const Window = ({ children }: ChildrenProps): JSX.Element => {
  return (
    <div className={styles.window}>
      {children}
    </div>
  )
}
