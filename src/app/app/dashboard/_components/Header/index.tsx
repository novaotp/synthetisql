
"use client";

// React + Next
import { useEffect, useRef } from 'react';
import Link from "next/link";
import Image from 'next/image';

// Internal
import LogoSynthetiSQL from 'public/logo_transparent_text_right.png';
import styles from './index.module.scss';

export const Header = () => {
  const profileRef = useRef<HTMLSpanElement>(null);
  const ulRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      event.preventDefault();
      const element = event.target as HTMLElement;

      if (profileRef.current!.contains(element)) {
        ulRef.current!.style.display = "flex";
      }
    }

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    }
  }, [])

  return (
    <nav className={styles.nav}>
      <Link className={styles.link} href="/">
        <Image
          src={LogoSynthetiSQL}
          alt="Logo SynthetiSQL"
          height="40"
          width="160"
        />
      </Link>
      <div className={styles.rightGroup}>
        <span ref={profileRef} className={styles.profileText}>My Profile here</span>
        <ul ref={ulRef}>
          hello
        </ul>
      </div>
    </nav>
  )
}
