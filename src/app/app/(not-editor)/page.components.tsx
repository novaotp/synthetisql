
'use client';

// React + Next
import {
  useEffect,
  useState,
  type ChangeEvent
} from 'react';
import {
  usePathname,
  useRouter,
  useSearchParams
} from 'next/navigation';

// Internal

/// -- Styling -- ///
import styles from './page.module.scss';
import { fetchAllDiagrams, newDiagram } from './server';
import { Diagram } from '../interfaces';
import { DiagramBlock } from './_components/DiagramBlock';

/** The main component of the app page. */
const Dashboard = (): JSX.Element => {
  const router = useRouter();
  const pathname = usePathname();
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

  const handleNewDiagram = async (): Promise<void> => {
    const id = await newDiagram();

    if (id === 0) {
      alert("Failed to create a new diagram");
      return;
    }

    router.push(`/app/${id}`);
  }

  const handleOnSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === '') {
      router.push(pathname);
      return;
    }

    router.push(`${pathname}?sort=${event.target.value}`);
  }

  const sortedDiagrams = (): Diagram[] => {
    if (searchParams.has('sort') && searchParams.get('sort') === 'oldest-to-newest') {
      return diagrams.sort((a, b) => a.updated_at.getTime() - b.updated_at.getTime());
    } else {
      return diagrams.sort((a, b) => b.updated_at.getTime() - a.updated_at.getTime());
    }
  }

  const defaultSortValue = () => {
    if (searchParams.has('sort') && searchParams.get('sort') !== '') {
      return searchParams.get('sort')!;
    }

    return '';
  }

  return (
    <div className={styles.block}>
      <div className={styles.header}>
        <h1>My Diagrams</h1>
        <select defaultValue={defaultSortValue()} onChange={handleOnSortChange}>
          <option value="">Newest to oldest</option>
          <option value="oldest-to-newest">Oldest to newest</option>
        </select>
        <button type="button" onClick={handleNewDiagram}>New Diagram</button>
      </div>
      <div className={styles.grid}>
        { sortedDiagrams().map((diagram, index) => <DiagramBlock key={index} diagram={diagram} />) }
      </div>
    </div>
  )
}

export default Dashboard;
