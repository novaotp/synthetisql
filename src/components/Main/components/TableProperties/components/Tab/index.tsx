
// React
import { type Dispatch, type SetStateAction } from 'react';

// Internal
import styles from './index.module.scss';
import TabLabel from '../../types';

interface TabProps {
  /** The label of the tab. */
  label: TabLabel,
  /** The currently active tab. */
  activeTab: TabLabel,
  /** The function to set the active tab. */
  setActiveTab: Dispatch<SetStateAction<TabLabel>>,
}

const Tab = ({ label, activeTab, setActiveTab }: TabProps): JSX.Element => {
  return (
    <li className={`${styles.tab} ${label === activeTab ? styles.active : ''}`}>
      <button
        onClick={() => setActiveTab(label)}
        className={styles.button}
      >
        {label}
      </button>
    </li>
  )
}

export default Tab;
