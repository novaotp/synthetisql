
'use client';

// Next
import { useRouter } from 'next/navigation';

// Internal

/// -- Styling -- ///
import styles from './page.module.scss';
import { newDiagram } from './server';

/// -- Components -- ///
import {
  Nav,
  Window,
  Main
} from './_components';

/** The main component of the app page. */
const Dashboard = (): JSX.Element => {
  const router = useRouter();

  const handleNewDiagram = async (): Promise<void> => {
    const id = await newDiagram();

    if (id === 0) {
      alert("Failed to create a new diagram");
      return;
    }

    router.push(`/app/${id}`);
  }

  return (
    <div className={styles.block}>
      <div className={styles.header}>
        <h1>My Diagrams</h1>
        <button type="button" onClick={handleNewDiagram}>New Diagram</button>
      </div>
    </div>
  )
}

export default Dashboard;
