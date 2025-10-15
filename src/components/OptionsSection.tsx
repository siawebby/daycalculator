'use client';

import React from 'react';
import { Icon } from './ui';

const OptionsSection: React.FC = () => {
  const options = [
    {
      icon: 'calendar',
      title: 'Business Days Calculator',
      description: 'Calculate working days between two dates, excluding weekends and holidays. Perfect for project planning, contract deadlines, and business scheduling. Get accurate business day counts for any date range.'
    },
    {
      icon: 'calendar',
      title: 'Countdown Timer',
      description: 'Create countdown timers for important events like birthdays, holidays, project deadlines, and special occasions. Track time remaining with precision down to the minute.'
    },
    {
      icon: 'calendar',
      title: 'Date Difference Calculator',
      description: 'Calculate the exact number of days, weeks, months, and years between any two dates with precision. Perfect for age calculations, project timelines, and date comparisons.'
    }
  ];

  return (
    <section className="options-text">
      <h2>What else we can do</h2>
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
