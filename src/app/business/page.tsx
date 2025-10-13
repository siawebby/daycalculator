'use client';

import React, { useState } from 'react';
import { Input, Checkbox, SettingItem, Select, Icon } from '../../components/ui';
import { DaysCounter } from '../../components/DaysCounter';
import OptionsSection from '../../components/OptionsSection';
import InfoSection from '../../components/InfoSection';

export default function BusinessPage() {
  const [includeLastDay, setIncludeLastDay] = useState(false);
  const [businessDaysOnly, setBusinessDaysOnly] = useState(false);
  const [startDate, setStartDate] = useState('23 Sep, 2025');
  const [startTime, setStartTime] = useState('12 p.m.');
  const [endDate, setEndDate] = useState('23 Sep, 2025');
  const [endTime, setEndTime] = useState('12 p.m.');
  const [weekendPattern, setWeekendPattern] = useState('Sat+Sun');
  const [state, setState] = useState('Germany');
  const [activeDatePicker, setActiveDatePicker] = useState<'start' | 'end' | null>(null);

  const weekendOptions = [
    { value: 'Sat+Sun', label: 'Sat+Sun' },
    { value: 'Fri+Sat', label: 'Fri+Sat' },
    { value: 'Sun+Mon', label: 'Sun+Mon' }
  ];

  const stateOptions = [
    { value: 'Germany', label: 'Germany' },
    { value: 'USA', label: 'USA' },
    { value: 'UK', label: 'UK' }
  ];

  const handleRefresh = () => {
    console.log('Refresh clicked');
  };

  const handleExport = () => {
    console.log('Export clicked');
  };

  const handleStartDateChange = (value: string) => {
    setStartDate(value);
    setActiveDatePicker('start');
  };

  const handleEndDateChange = (value: string) => {
    setEndDate(value);
    setActiveDatePicker('end');
  };

  const handleCloseDatePicker = () => {
    setActiveDatePicker(null);
  };

  const handleOpenStartDatePicker = () => {
    setActiveDatePicker('start');
  };

  const handleOpenEndDatePicker = () => {
    setActiveDatePicker('end');
  };

  return (
    <main>
      <div className="container">
        <section className="params-list d-flex justify-content-between">
          <div className="setting-container">
            <div className="setting-list d-flex flex-column">
              <SettingItem label="Start" icon="nav/calendar">
                  <Input 
                    variant="date" 
                    value={startDate} 
                    onDateChange={handleStartDateChange}
                    isActive={activeDatePicker === 'start'}
                    onClose={handleCloseDatePicker}
                    onOpen={handleOpenStartDatePicker}
                  />
                  <Input 
                    variant="time" 
                    value={startTime} 
                    onChange={(e) => setStartTime(e.target.value)}
                  />
              </SettingItem>
              
              <SettingItem label="End" icon="nav/calendar">
                  <Input 
                    variant="date" 
                    value={endDate}  
                    onDateChange={handleEndDateChange}
                    isActive={activeDatePicker === 'end'}
                    onClose={handleCloseDatePicker}
                    onOpen={handleOpenEndDatePicker}
                  />
                  <Input 
                    variant="time" 
                    value={endTime} 
                    onChange={(e) => setEndTime(e.target.value)}
                  />
              </SettingItem>
              
              <SettingItem label="Weekend pattern" icon="smile">
                <Select
                  options={weekendOptions}
                  value={weekendPattern}
                  onChange={(value) => setWeekendPattern(value)}
                />
              </SettingItem>
              
              <SettingItem label="State" icon="location">
                <Select
                  options={stateOptions}
                  value={state}
                  onChange={(value) => setState(value)}
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
            days={41}
            additionalInfo="58 calendar days - 17 days skipped"
            excludedInfo={{
              saturdays: 8,
              sundays: 8,
              holidays: [
                { name: 'Day of German Unity', count: 1 }
              ]
            }}
            onRefresh={handleRefresh}
            onExport={handleExport}
          />
          
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
