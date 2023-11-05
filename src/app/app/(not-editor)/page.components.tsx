
'use client';

// MUI Icons
import AddRoundedIcon from '@mui/icons-material/AddRounded';

// React + Next
import {
  useEffect,
  useState,
  useCallback,
  type ChangeEvent,
} from 'react';
import {
  usePathname,
  useRouter,
  useSearchParams
} from 'next/navigation';

// Internal
import styles from './page.module.scss';
import { fetchAllDiagrams, newDiagram } from './server';
import { Diagram } from '../interfaces';
import { Labeled, DiagramBlock } from './_components';

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

  const createQueryString = useCallback((name: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(name, value);

    return params.toString();
  }, [searchParams]);

  const removeQueryParam = useCallback((name: string) => {
    const params = new URLSearchParams(searchParams);
    params.delete(name);

    return params.toString();
  }, [searchParams]);

  const handleOnSortChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    event.preventDefault();

    if (event.target.value === '') {
      router.push(`${pathname}?${removeQueryParam('sort')}`);
      return;
    }

    router.push(`${pathname}?${createQueryString('sort', event.target.value)}`);
  }

  const sortedDiagrams = (): Diagram[] => {
    if (searchParams.get('sort') === 'oldest-to-newest') {
      return structuredClone(diagrams).sort((a, b) => a.updated_at.getTime() - b.updated_at.getTime());
    }

    return structuredClone(diagrams).sort((a, b) => b.updated_at.getTime() - a.updated_at.getTime());
  }

  const handleOnFilterChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();

    if (event.target.value === '') {
      router.push(`${pathname}?${removeQueryParam('filter')}`);
      return;
    }

    router.push(`${pathname}?${createQueryString('filter', event.target.value)}`);
  }

  return (
    <div className={styles.block}>
      <div className={styles.header}>
        <h1>My Diagrams</h1>
        <Labeled label='Filter' htmlFor='filter'>
          <input type="text" defaultValue={searchParams.get('filter') ?? ''} placeholder="Search a diagram..." onChange={handleOnFilterChange} />
        </Labeled>
        <Labeled label='Sort' htmlFor='sort'>
          <select defaultValue={searchParams.get('sort') ?? ''} onChange={handleOnSortChange}>
            <option value="">Newest to oldest</option>
            <option value="oldest-to-newest">Oldest to newest</option>
          </select>
        </Labeled>
        <button className={styles.add} type="button" onClick={handleNewDiagram}><AddRoundedIcon /></button>
      </div>
      <div className={styles.grid}>
        { sortedDiagrams().map((diagram) => <DiagramBlock key={diagram.id} diagram={diagram} />) }
      </div>
    </div>
  )
}

export default Dashboard;
