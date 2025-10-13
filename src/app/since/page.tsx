'use client';

import React, { useState } from 'react';
import { Input, Checkbox, SettingItem, Switcher, Icon } from '../../components/ui';
import { DaysCounter } from '../../components/DaysCounter';
import OptionsSection from '../../components/OptionsSection';
import InfoSection from '../../components/InfoSection';

export default function SincePage() {
  const [includeLastDay, setIncludeLastDay] = useState(false);
  const [date, setDate] = useState('23 Sep, 2025');
  const [time, setTime] = useState('12 p.m.');
  const [switcherValue, setSwitcherValue] = useState('Since');
  const [activeDatePicker, setActiveDatePicker] = useState<boolean>(false);

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

  const handleDateChange = (value: string) => {
    setDate(value);
    setActiveDatePicker(true);
  };

  const handleOpenDatePicker = () => {
    setActiveDatePicker(true);
  };

  const handleCloseDatePicker = () => {
    setActiveDatePicker(false);
  };

  return (
    <main>
      <div className="container">
        <section className="params-list d-flex justify-content-between flex-column">
          <div className="setting-container setting-container--row d-flex justify-content-between">
            <div className="setting-list d-flex flex-row">
              <SettingItem label="Date">
                <Input
                  variant="date"
                  value={date}
                  onDateChange={handleDateChange}
                  isActive={activeDatePicker}
                  onClose={handleCloseDatePicker}
                  onOpen={handleOpenDatePicker}
                />
                <Input
                  variant="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </SettingItem>

              <SettingItem label="Include last day">
                <Checkbox
                  id="include-last-day_2"
                  checked={includeLastDay}
                  onChange={setIncludeLastDay}
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
                  since 15.07.2025
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
