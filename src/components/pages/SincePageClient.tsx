'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Input, Checkbox, SettingItem, Switcher, Icon, Button } from '../ui';
import { DaysCounter } from '../DaysCounter';
import OptionsSection from '../OptionsSection';
import InfoSection from '../InfoSection';
import { getCurrentDateAsUiString } from '../../utils/dateUtils';

export default function SincePageClient() {
  const t = useTranslations('common');
  const tSwitcher = useTranslations('switcherOptions');
  const tSince = useTranslations('since');
  
  const [includeLastDay, setIncludeLastDay] = useState(false);
  const [date, setDate] = useState(getCurrentDateAsUiString());
  const [time, setTime] = useState('12 p.m.');
  const [switcherValue, setSwitcherValue] = useState('Since');
  const [activeDatePicker, setActiveDatePicker] = useState<boolean>(false);

  const switcherOptions = [
    { value: 'Since', label: tSwitcher('since') },
    { value: 'Until', label: tSwitcher('until') }
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
          <div className="in-tablet d-flex justify-content-end">
            <Switcher
              options={switcherOptions}
              activeValue={switcherValue}
              onChange={setSwitcherValue}
              variant="default"
            />
          </div>
          <div className="setting-container setting-container--row d-flex justify-content-between">
            <div className="setting-list d-flex flex-row">
              <SettingItem label={t('date')}>
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

              <SettingItem label={t('includeLastDay')}>
                <Checkbox
                  id="include-last-day_2"
                  checked={includeLastDay}
                  onChange={setIncludeLastDay}
                />
              </SettingItem>
            </div>

            <div className="in-desktop">
              <Switcher
                options={switcherOptions}
                activeValue={switcherValue}
                onChange={setSwitcherValue}
                variant="since"
              />
            </div>
          </div>

          <DaysCounter
            days={50}
            variant="row"
            resultText={tSince('resultText')}
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
