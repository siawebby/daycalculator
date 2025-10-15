'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Input, Checkbox, SettingItem, Icon, Button, ToastContainer } from '../ui';
import { DaysCounter } from '../DaysCounter';
import OptionsSection from '../OptionsSection';
import InfoSection from '../InfoSection';
import { useDurationStore } from '../../store/durationStore';
import { useToastStore } from '../../store/toastStore';

export default function HomePage() {
  const t = useTranslations('common');
  const tValidation = useTranslations('validation');
  const [includeLastDay, setIncludeLastDay] = useState(false);
  const [businessDaysOnly, setBusinessDaysOnly] = useState(false);
  const [startDate, setStartDate] = useState('23 Sep, 2025');
  const [startTime, setStartTime] = useState('12 p.m.');
  const [endDate, setEndDate] = useState('23 Sep, 2025');
  const [endTime, setEndTime] = useState('12 p.m.');
  const [activeDatePicker, setActiveDatePicker] = useState<'start' | 'end' | null>(null);
  const { result, loading, error, calculate } = useDurationStore();
  const { toasts, addToast, removeToast } = useToastStore();

  // Validation functions
  const validateDate = (dateStr: string): boolean => {
    if (!dateStr || typeof dateStr !== 'string') return false;
    const normalized = dateStr.trim().replace(/,/g, '');
    const parsed = new Date(normalized);
    return !isNaN(parsed.getTime());
  };

  const validateDateRange = (start: string, end: string): boolean => {
    if (!validateDate(start) || !validateDate(end)) return false;
    
    const startNormalized = start.trim().replace(/,/g, '');
    const endNormalized = end.trim().replace(/,/g, '');
    const startDate = new Date(startNormalized);
    const endDate = new Date(endNormalized);
    
    return endDate >= startDate;
  };

  const handleRefresh = async () => {
    // Validate dates before sending request
    if (!validateDate(startDate)) {
      addToast({
        type: 'error',
        title: tValidation('error'),
        message: tValidation('invalidStartDate'),
        duration: 5000
      });
      return;
    }

    if (!validateDate(endDate)) {
      addToast({
        type: 'error',
        title: tValidation('error'),
        message: tValidation('invalidEndDate'),
        duration: 5000
      });
      return;
    }

    if (!validateDateRange(startDate, endDate)) {
      addToast({
        type: 'error',
        title: tValidation('error'),
        message: tValidation('endDateBeforeStartDate'),
        duration: 5000
      });
      return;
    }

    try {
      await calculate({
        startDate,
        endDate,
        includeLastDay
      });
      
      // Show success toast if calculation was successful
      if (result && !error) {
        addToast({
          type: 'success',
          title: tValidation('calculationComplete'),
          message: tValidation('durationCalculated'),
          duration: 3000
        });
      }
    } catch (err) {
      addToast({
        type: 'error',
        title: tValidation('calculationError'),
        message: error || tValidation('unknownError'),
        duration: 5000
      });
    }
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
      <ToastContainer toasts={toasts} onClose={removeToast} />
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
              
              <SettingItem label={t('includeLastDay')} icon="bookmark">
                <Checkbox
                  id="include-last-day"
                  checked={includeLastDay} 
                  onChange={setIncludeLastDay}
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
            days={result?.days ?? 0}
            weeks={result?.weeks ?? undefined}
            months={result?.months ?? undefined}
            years={result?.years ?? undefined}
            resultText={
              loading ? t('calculating') : error ? error : undefined
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
