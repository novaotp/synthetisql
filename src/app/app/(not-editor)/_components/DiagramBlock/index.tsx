
// Next
import Link from 'next/link';

// Internal
import styles from './index.module.scss';
import { Diagram } from '@/app/app/interfaces';

interface DiagramBlockProps {
  diagram: Diagram,
}

export const DiagramBlock = ({ diagram }: DiagramBlockProps): JSX.Element => {
  const { id, title, updated_at } = diagram;
  const href = `/app/${id}`;

  const isToday = (): boolean => {
    const today = new Date();

    if (today.getFullYear() === updated_at.getFullYear() &&
      today.getMonth() === updated_at.getMonth() &&
      today.getDate() === updated_at.getDate()
    ) {
      return true;
    }

    return false;
  }

  // How to show month name instead of month number ?
  // give me a function to get the month name instead of the month number


  return (
    <Link className={styles.link} href={href}>
      <span>{title}</span>
      <span>
        Last save :&nbsp;
        {
          isToday()
            ? `Today at ${updated_at.getHours().toLocaleString('default', { minimumIntegerDigits: 2 })}:${updated_at.getMinutes().toLocaleString('default', { minimumIntegerDigits: 2 })}`
            : `${updated_at.getDate()} ${updated_at.toLocaleString('default', { month: 'long' })} ${updated_at.getFullYear()} at ${updated_at.getHours().toLocaleString('default', { minimumIntegerDigits: 2 })}:${updated_at.getMinutes().toLocaleString('default', { minimumIntegerDigits: 2 })}`
        }
      </span>
    </Link>
  )
}
