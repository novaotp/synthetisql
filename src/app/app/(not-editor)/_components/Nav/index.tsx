
"use client";

// MUI Icons
import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

// React + Next
import { useEffect, useRef } from 'react';
import Link from "next/link";
import Image from 'next/image';

// Internal
import LogoSynthetiSQL from 'public/logo_transparent_text_right.png';
import styles from './index.module.scss';
import { useAccount } from '@hooks/useAccount';
import { NavLink } from './Link';

export const Nav = () => {
  const profileRef = useRef<HTMLSpanElement>(null);
  const ulRef = useRef<HTMLUListElement>(null);
  const account = useAccount();

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      event.preventDefault();
      const element = event.target as HTMLElement;

      if (profileRef.current!.contains(element) || ulRef.current!.contains(element)) {
        ulRef.current!.style.display = ulRef.current!.style.display === 'none' ? 'flex' : 'none';
      } else {
        ulRef.current!.style.display = "none";
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
        <span ref={profileRef} className={styles.profileText}>{account.firstName} {account.lastName}</span>
        <ul ref={ulRef} className={styles.profileOptions}>
          <NavLink href='/app' icon={<AccountTreeRoundedIcon />} text="Diagrams" />
          <NavLink href='/app/profile' icon={<PersonRoundedIcon />} text="Profile" />
          <NavLink href='/auth/log-out' icon={<LogoutRoundedIcon />} text="Disconnect" />
        </ul>
      </div>
    </nav>
  )
}
