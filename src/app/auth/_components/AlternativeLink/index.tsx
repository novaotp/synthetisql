
// Next
import Link from 'next/link';

// Internal
import styles from './index.module.scss';

interface AlternativeLinkParams {
  text: string,
  href: string,
  label: string,
}

export const AlternativeLink = ({ text, href, label }: AlternativeLinkParams): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.text}>{text}</span>
      &nbsp;
      <Link className={styles.link} href={href}>
        {label}
      </Link>
    </div>
  )
}
