
"use client";

// MUI Icons
import AddRoundedIcon from '@mui/icons-material/AddRounded';

// Next
import { useRouter } from 'next/navigation';

// Internal
import styles from './index.module.scss';
import { newDiagram } from '../../server';

export const AddDiagram = (): JSX.Element => {
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
    <button className={styles.add} type="button" onClick={handleNewDiagram}>
      <AddRoundedIcon />
    </button>
  )
}
