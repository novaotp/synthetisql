
'use client';

// React + Next
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

// Internal
import styles from './page.module.scss';
import { fetchAllDiagrams } from './server';
import { Diagram } from '../interfaces';

/// -- Components -- ///
import {
  DiagramBlock,
  Sort,
  Filter,
  AddDiagram
} from './_components';

/** The main component of the app page. */
const Dashboard = (): JSX.Element => {
  const searchParams = useSearchParams();
  const [diagrams, setDiagrams] = useState<Diagram[]>([]);

  useEffect(() => {
    (async () => {
      const allDiagrams = await fetchAllDiagrams();

      if (!allDiagrams) {
        alert('Could not load diagrams');
        return;
      }

      setDiagrams(allDiagrams);
    })();
  }, []);

  const sortedDiagrams = (): Diagram[] => {
    if (searchParams.get('sort') === 'oldest-to-newest') {
      return structuredClone(diagrams).sort((a, b) => a.updated_at.getTime() - b.updated_at.getTime());
    }

    return structuredClone(diagrams).sort((a, b) => b.updated_at.getTime() - a.updated_at.getTime());
  }

  return (
    <div className={styles.block}>
      <div className={styles.header}>
        <h1>My Diagrams</h1>
        <Filter />
        <Sort />
        <AddDiagram />
      </div>
      <div className={styles.grid}>
        { sortedDiagrams().map((diagram) => <DiagramBlock key={diagram.id} diagram={diagram} />) }
      </div>
    </div>
  )
}

export default Dashboard;
