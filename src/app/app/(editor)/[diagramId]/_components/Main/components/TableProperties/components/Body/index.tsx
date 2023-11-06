
// Internal
import styles from './index.module.scss';
import TabLabel from '../../types';

/// -- Components -- ///
import { General } from './components';

interface BodyProps {
  /** If the tab is active. */
  activeTab: TabLabel,
}

const Body = ({ activeTab }: BodyProps): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      {
        (() => {
          switch (activeTab) {
            case 'General':
              return <General />;
            case 'Columns':
              return <p>Rendering the columns table...</p>;
            default:
              return <p>Expected a tab to be active...</p>;
          }
        })()
      }
    </div>
  )
}

export default Body;
