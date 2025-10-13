'use client';

import React from 'react';
import Link from 'next/link';
import { Icon } from './ui';

const Header: React.FC = () => {
  const navItems = [
    { href: '/', label: 'Duration', icon: 'nav/calendar', iconHover: 'nav/hover/calendar' },
    { href: '/substract', label: 'Add/Subtract', icon: 'nav/settings', iconHover: 'nav/hover/settings' },
    { href: '/business', label: 'Business Days', icon: 'nav/portfolio', iconHover: 'nav/hover/portfolio' },
    { href: '/countdown', label: 'Countdown', icon: 'nav/flag', iconHover: 'nav/hover/flag' },
    { href: '/since', label: 'Days since/until', icon: 'nav/configure', iconHover: 'nav/hover/configure' },
    { href: '/hours', label: 'Hours to Days', icon: 'nav/time', iconHover: 'nav/hover/time' },
  ];

  return (
    <header>
      <div className="container">
        <div className="header-logo">
          <img src="/assets/img/logo.svg" alt="Logo" />
        </div>
        <nav className="header-menu d-flex justify-content-center">
          <ul className="d-flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="d-flex align-items-center">
                  <Icon name={item.icon} className="link-icon" />
                  <Icon name={item.iconHover} className="link-icon--hover" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
