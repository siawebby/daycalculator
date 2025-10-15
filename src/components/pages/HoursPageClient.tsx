'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Input, SettingItem, Select, Switcher, Icon, Button } from '../ui';
import { DaysCounter } from '../DaysCounter';
import OptionsSection from '../OptionsSection';
import InfoSection from '../InfoSection';

export default function HoursPageClient() {
  const t = useTranslations('common');
  const tAmount = useTranslations('amountOptions');
  const tSwitcher = useTranslations('switcherOptions');
  
  const [amount, setAmount] = useState('15');
  const [amountType, setAmountType] = useState('Months');
  const [switcherValue, setSwitcherValue] = useState('Since');

  const amountOptions = [
    { value: 'Months', label: tAmount('months') },
    { value: 'Days', label: tAmount('days') },
    { value: 'Weeks', label: tAmount('weeks') }
  ];

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

  return (
    <main>
      <div className="container">
        <section className="params-list d-flex justify-content-between flex-column">
          <div className="setting-container setting-container--row d-flex justify-content-between">
            <div className="setting-list d-flex flex-row">
              <SettingItem label={t('amount')}>
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

          <DaysCounter
            days={50}
            variant="row"
            resultText={t('andHours')}
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
