'use client';

import React, { useState } from 'react';
import { Input, Checkbox, SettingItem, Icon, Button } from '../ui';
import { DaysCounter } from '../DaysCounter';
import OptionsSection from '../OptionsSection';
import InfoSection from '../InfoSection';
import { useDurationStore } from '../../store/durationStore';

export default function HomePage() {
  const [includeLastDay, setIncludeLastDay] = useState(false);
  const [businessDaysOnly, setBusinessDaysOnly] = useState(false);
  const [startDate, setStartDate] = useState('23 Sep, 2025');
  const [startTime, setStartTime] = useState('12 p.m.');
  const [endDate, setEndDate] = useState('23 Sep, 2025');
  const [endTime, setEndTime] = useState('12 p.m.');
  const [activeDatePicker, setActiveDatePicker] = useState<'start' | 'end' | null>(null);
  const { result, loading, error, calculate } = useDurationStore();

  const handleRefresh = () => {
    calculate({
      startDate,
      endDate,
      includeLastDay
    });
  };

  const handleExport = () => {
    // Logic for export
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
            days={result?.days ?? 0}
            weeks={result?.weeks ?? undefined}
            months={result?.months ?? undefined}
            years={result?.years ?? undefined}
            resultText={
              loading ? 'Calculating…' : error ? error : undefined
            }
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
