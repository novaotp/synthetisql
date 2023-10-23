
'use client';

// Internal

/// -- Styling -- ///
import styles from './page.module.scss';

/// -- Components -- ///
import Main from '@components/Main';
import Sidebar from "@components/Sidebar";
import Topbar from "@components/Topbar";

/** The main component of the landing page. */
const Landing = (): JSX.Element => {
  return (
    <div className={styles.landing}>
      <Sidebar />
      <div className={styles.vertical}>
        <Topbar />
        <Main />
      </div>
    </div>
  )
}

export default Landing;
