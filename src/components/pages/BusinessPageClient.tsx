'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Input, Checkbox, SettingItem, Select, Icon, Button } from '../ui';
import { DaysCounter } from '../DaysCounter';
import OptionsSection from '../OptionsSection';
import InfoSection from '../InfoSection';
import { getCurrentDateAsUiString } from '../../utils/dateUtils';

export default function BusinessPageClient() {
  const t = useTranslations('common');
  const tWeekend = useTranslations('weekendOptions');
  const tState = useTranslations('stateOptions');
  const tBusiness = useTranslations('business');
  
  const [includeLastDay, setIncludeLastDay] = useState(false);
  const [businessDaysOnly, setBusinessDaysOnly] = useState(false);
  const [startDate, setStartDate] = useState(getCurrentDateAsUiString());
  const [startTime, setStartTime] = useState('12 p.m.');
  const [endDate, setEndDate] = useState(getCurrentDateAsUiString());
  const [endTime, setEndTime] = useState('12 p.m.');
  const [weekendPattern, setWeekendPattern] = useState('Sat+Sun');
  const [state, setState] = useState('Germany');
  const [activeDatePicker, setActiveDatePicker] = useState<'start' | 'end' | null>(null);

  const weekendOptions = [
    { value: 'Sat+Sun', label: tWeekend('satSun') },
    { value: 'Fri+Sat', label: tWeekend('friSat') },
    { value: 'Sun+Mon', label: tWeekend('sunMon') }
  ];

  const stateOptions = [
    { value: 'Germany', label: tState('germany') },
    { value: 'USA', label: tState('usa') },
    { value: 'UK', label: tState('uk') }
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
              <SettingItem label={t('start')} icon="nav/calendar">
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
              
              <SettingItem label={t('end')} icon="nav/calendar">
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
              
              <SettingItem label={t('weekendPattern')} icon="smile">
                <Select
                  options={weekendOptions}
                  value={weekendPattern}
                  onChange={(value) => setWeekendPattern(value)}
                />
              </SettingItem>
              
              <SettingItem label={t('state')} icon="location">
                <Select
                  options={stateOptions}
                  value={state}
                  onChange={(value) => setState(value)}
                />
              </SettingItem>
              
              <SettingItem label={t('businessDaysOnly')} icon="nav/portfolio">
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
            additionalInfo={tBusiness('additionalInfo')}
            excludedInfo={{
              saturdays: 8,
              sundays: 8,
              holidays: [
                { name: tBusiness('holidays.dayOfGermanUnity'), count: 1 }
              ]
            }}
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
