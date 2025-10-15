'use client';

import React, { useState } from 'react';
import { Input, Checkbox, SettingItem, Switcher, Icon, Button } from '../ui';
import { DaysCounter } from '../DaysCounter';
import OptionsSection from '../OptionsSection';
import InfoSection from '../InfoSection';

export default function SincePageClient() {
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

          <DaysCounter
            days={50}
            variant="row"
            resultText="since 15.07.2025"
            onRefresh={handleRefresh}
            onExport={handleExport}
          />
        </section>

        <OptionsSection />
        <InfoSection />
      </div>
    </main>
  );
}
