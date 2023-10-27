
'use client';

// MUI Icons
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';

// Next
import Image from 'next/image';

// Internal
import styles from './page.module.scss';
import LogoSynthetiSQL from '/public/logo_transparent_text_right.png';
import Link from 'next/link';

/** The main component of the landing page. */
const Landing = (): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.nav}>
        <Link href="/">
          <Image
            src={LogoSynthetiSQL}
            alt="Logo SynthetiSQL"
            height="60"
            width="240"
          />
        </Link>
        <div className={styles.rightGroup}>
          <a className={styles.try} href='/app'>Try SynthetiSQL</a>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.landing}>
          <div className={`${styles.box} ${styles.text}`}>
            <h1>Unleash Your Database's Potential</h1>
            <h2>Effortless Database Modeling and SQL Script Generation</h2>
            <p>
              Dive into a seamless experience with SynthetiSQL, your go-to open source
              database modeling tool. Craft robust databases models and automatically generate
              SQL scripts for your favorite relational database. Embrace the simplicity and
              efficiency SynthetiSQL brings to the table.
            </p>
            <Link href="/app">Try it now&nbsp;&nbsp;&nbsp;&nbsp;<ArrowForwardRoundedIcon /></Link>
          </div>
          <div className={`${styles.box} ${styles.illustration}`}>
            {/** Placeholder for image */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing;
