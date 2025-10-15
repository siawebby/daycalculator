'use client';

import React, { useState } from 'react';
import { Input, Checkbox, SettingItem, Select, Switcher, Icon, Button } from '../ui';
import { DaysCounter } from '../DaysCounter';
import OptionsSection from '../OptionsSection';
import InfoSection from '../InfoSection';

export default function SubstractPageClient() {
  const [includeLastDay, setIncludeLastDay] = useState(false);
  const [businessDaysOnly, setBusinessDaysOnly] = useState(false);
  const [startDate, setStartDate] = useState('23 Sep, 2025');
  const [startTime, setStartTime] = useState('12 p.m.');
  const [amount, setAmount] = useState('15');
  const [amountType, setAmountType] = useState('Months');
  const [switcherValue, setSwitcherValue] = useState('Add');
  const [activeDatePicker, setActiveDatePicker] = useState<boolean>(false);

  const amountOptions = [
    { value: 'Months', label: 'Months' },
    { value: 'Days', label: 'Days' },
    { value: 'Weeks', label: 'Weeks' }
  ];

  const switcherOptions = [
    { value: 'Add', label: 'Add' },
    { value: 'Subtract', label: 'Subtract' }
  ];

  const handleRefresh = () => {
    console.log('Refresh clicked');
  };

  const handleExport = () => {
    console.log('Export clicked');
  };

  const handleDateChange = (value: string) => {
    setStartDate(value);
    setActiveDatePicker(true);
  };

  const handleOpenDatePicker = () => {
    setActiveDatePicker(true);
  };

  const handleCloseDatePicker = () => {
    setActiveDatePicker(false);
  };

  return (
    <main className="substract">
      <div className="container">
        <Switcher
          options={switcherOptions}
          activeValue={switcherValue}
          onChange={setSwitcherValue}
          variant="default"
        />

        <section className="params-list d-flex justify-content-between">
          <div className="setting-container">
            <div className="setting-list d-flex flex-column">
              <SettingItem label="Start" icon="nav/calendar">
                <Input
                  variant="date"
                  value={startDate}
                  onDateChange={handleDateChange}
                  isActive={activeDatePicker}
                  onClose={handleCloseDatePicker}
                  onOpen={handleOpenDatePicker}
                />
                <Input
                  variant="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </SettingItem>

              <SettingItem label="Amount" icon="chart_pie">
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

              <SettingItem label="Include last day" icon="bookmark">
                <Checkbox
                  id="include-last-day"
                  checked={includeLastDay}
                  onChange={setIncludeLastDay}
                />
              </SettingItem>

              <SettingItem label="Business days only" icon="nav/portfolio">
                <Checkbox
                  id="include-last-day_2"
                  checked={businessDaysOnly}
                  onChange={setBusinessDaysOnly}
                />
              </SettingItem>
            </div>
          </div>

          <DaysCounter
            days={50}
            weeks={12}
            months={3}
            years={1} 
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
