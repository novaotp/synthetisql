
'use client';

// React
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Internal

/// -- Styling -- ///
import styles from './page.module.scss';

/// -- Components -- ///
import { Header } from './_components';

/** The main component of the app page. */
const Dashboard = (): JSX.Element => {
  return (
    <div>
      <Header />
    </div>
  )
}

export default Dashboard;
