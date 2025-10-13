'use client';

import React from 'react';
import { Icon } from './ui';

const OptionsSection: React.FC = () => {
  const options = [
    {
      icon: 'calendar',
      title: 'Count Business Days',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      icon: 'calendar',
      title: 'Count Business Days',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      icon: 'calendar',
      title: 'Count Business Days',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
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
