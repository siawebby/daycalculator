'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Icon } from './ui';

const OptionsSection: React.FC = () => {
  const t = useTranslations('options');
  
  const options = [
    {
      icon: 'calendar',
      title: t('businessCalculator.title'),
      description: t('businessCalculator.description')
    },
    {
      icon: 'calendar',
      title: t('countdownTimer.title'),
      description: t('countdownTimer.description')
    },
    {
      icon: 'calendar',
      title: t('dateDifference.title'),
      description: t('dateDifference.description')
    }
  ];

  return (
    <section className="options-text">
      <h2>{t('title')}</h2>
      <div className="options-container">
        <div className="row">
          {options.map((option, index) => (
            <div key={index} className="col-12 col-md-4">
              <div className="option-item d-flex flex-column">
                <div className="option-item__icon">
                  <Icon name={option.icon} size='lg' /> 
                </div>
                <h3>{option.title}</h3>
                <p>{option.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OptionsSection;
