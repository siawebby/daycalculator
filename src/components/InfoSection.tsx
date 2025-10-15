'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

const InfoSection: React.FC = () => {
  const t = useTranslations('info');
  
  return (
    <section className="info-text">
      <h2>{t('title')}</h2>
      <div className="info-text__content">
        <p>
          {t('description1')}
        </p>
        <p>
          {t('description2')}
        </p>
        <p>
          {t('description3')}
        </p>
      </div>
    </section>
  );
};

export default InfoSection;
