
"use client";

// React + Next
import { type ReactNode } from 'react';
import Link from 'next/link';

// Internal
import styles from './index.module.scss';

interface NavLinkProps {
  href: string,
  icon: any,
  text: string
}

export const NavLink = ({ href, icon, text }: NavLinkProps) => {
  return (
    <li className={styles.item}>
      <Link className={styles.link} href={href}>
        {icon}&nbsp;&nbsp;&nbsp;&nbsp;{text}
      </Link>
    </li>
  )
}
