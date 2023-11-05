
"use client";

// React
import React, { type ReactElement } from 'react';

// Internal
import styles from './index.module.scss';

interface LabeledProps {
  label: string,
  htmlFor: string,
  children: ReactElement<HTMLInputElement | HTMLSelectElement>
}

/** 
 * Adds a horizontal label to the given input or select element.
 * 
 * *Automatically adds the `htmlFor` to the child.*
 */
export const Labeled = ({ label, htmlFor, children }: LabeledProps) => {
  return (
    <div className={styles.wrapper}>
      <label htmlFor={htmlFor}>{label}</label>&nbsp;&nbsp;&nbsp;&nbsp;
      {
        React.cloneElement(children, {
          name: htmlFor,
          className: styles.child
        })
      }
    </div>
  )
}
