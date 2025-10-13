'use client';

import React, { useState } from 'react';
import { Input, SettingItem, Select, Switcher, Icon } from '../../components/ui';
import { DaysCounter } from '../../components/DaysCounter';
import OptionsSection from '../../components/OptionsSection';
import InfoSection from '../../components/InfoSection';

export default function HoursPage() {
  const [amount, setAmount] = useState('15');
  const [amountType, setAmountType] = useState('Months');
  const [switcherValue, setSwitcherValue] = useState('Since');

  const amountOptions = [
    { value: 'Months', label: 'Months' },
    { value: 'Days', label: 'Days' },
    { value: 'Weeks', label: 'Weeks' }
  ];

  const switcherOptions = [
    { value: 'Since', label: 'Since' },
    { value: 'Until', label: 'Until' }
  ];

  const handleRefresh = () => {
    console.log('Refresh clicked');
  };

  const handleExport = () => {
    console.log('Export clicked');
  };

  return (
    <main>
      <div className="container">
        <section className="params-list d-flex justify-content-between flex-column">
          <div className="setting-container setting-container--row d-flex justify-content-between">
            <div className="setting-list d-flex flex-row">
              <SettingItem label="Amount">
                <Input
                  variant="day"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <Select
                  options={amountOptions}
                  value={amountType}
                  onChange={(value) => setAmountType(value)}
                />
              </SettingItem>
            </div>

            <Switcher
              options={switcherOptions}
              activeValue={switcherValue}
              onChange={setSwitcherValue}
              variant="since"
            />
          </div>

          <div className="days-container days-container--row d-flex flex-column">
            <div className="days-container__top">
              <a href="#">
                Result <Icon name="days_counter/arrow" />
              </a>
            </div>
            <div className="days-container__bottom">
              <div className="day-number">
                50 days
              </div>
              <div className="day-options d-flex justify-content-between align-items-streetch">
                <div className="day-options__text d-flex flex-wrap align-items-center">
                  And 16 hours
                </div>
                <div className="day-options__buttons d-flex align-items-end">
                  <button className="refresh-btn" onClick={handleRefresh}>
                    <Icon name="days_counter/refresh" />
                  </button>
                  <button onClick={handleExport}>
                    <Icon name="days_counter/export" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <button className="refresh-mobile">
            <Icon name="days_counter/refresh_white" /> Reload
          </button>
        </section>

        <OptionsSection />
        <InfoSection />
      </div>
    </main>
  );
}
