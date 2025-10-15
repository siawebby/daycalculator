'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Icon } from './ui';

const Header: React.FC = () => {
  const pathname = usePathname();
  const t = useTranslations('navigation');
  
  const navItems = [
    { href: '/', label: t('duration'), icon: 'nav/calendar', iconHover: 'nav/hover/calendar' },
    { href: '/substract', label: t('addSubtract'), icon: 'nav/settings', iconHover: 'nav/hover/settings' },
    { href: '/business', label: t('businessDays'), icon: 'nav/portfolio', iconHover: 'nav/hover/portfolio' },
    { href: '/countdown', label: t('countdown'), icon: 'nav/flag', iconHover: 'nav/hover/flag' },
    { href: '/since', label: t('daysSinceUntil'), icon: 'nav/configure', iconHover: 'nav/hover/configure' },
    { href: '/hours', label: t('hoursToDays'), icon: 'nav/time', iconHover: 'nav/hover/time' },
  ];

  const sliderRef = useRef<HTMLUListElement>(null);
  const [isSlider, setIsSlider] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);

  useEffect(() => {
    const checkScreenSize = () => {
      const isTabletOrMobile = window.innerWidth <= 991;
      setIsSlider(isTabletOrMobile);
      
      if (isTabletOrMobile && sliderRef.current) {
        const container = sliderRef.current;
        setMaxScroll(container.scrollWidth - container.clientWidth);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!sliderRef.current) return;

    const container = sliderRef.current;
    const itemWidth = container.scrollWidth / navItems.length;
    const visibleItems = Math.floor(container.clientWidth / itemWidth);
    const scrollAmount = itemWidth * Math.max(1, visibleItems - 1);
    
    const newPosition = direction === 'left' 
      ? Math.max(0, scrollPosition - scrollAmount)
      : Math.min(maxScroll, scrollPosition + scrollAmount);

    container.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    });
    setScrollPosition(newPosition);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const startX = touch.clientX;
    const startScrollLeft = sliderRef.current?.scrollLeft || 0;

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      const deltaX = touch.clientX - startX;
      if (sliderRef.current) {
        sliderRef.current.scrollLeft = startScrollLeft - deltaX;
      }
    };

    const handleTouchEnd = () => {
      if (sliderRef.current) {
        setScrollPosition(sliderRef.current.scrollLeft);
      }
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };

    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
  };

  return (
    <header>
      <div className="container">
        <div className="header-logo">
          <img src="/assets/img/logo.svg" alt="Logo" />
        </div>
        <nav className="header-menu d-flex justify-content-center align-items-center">
          <ul 
            ref={sliderRef}
            className={`d-flex ${isSlider ? 'slider-container' : ''}`}
            onTouchStart={handleTouchStart}
          >
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href} className={isSlider ? 'slider-item' : ''}>
                  <Link 
                    href={item.href} 
                    className={`d-flex align-items-center ${isActive ? 'active' : ''}`}
                  >
                    <Icon name={item.icon} className="link-icon" />
                    <Icon name={item.iconHover} className="link-icon--hover" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
