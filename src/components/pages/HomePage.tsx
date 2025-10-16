'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Input, Checkbox, SettingItem, Icon, Button, ToastContainer } from '../ui';
import { DaysCounter } from '../DaysCounter';
import OptionsSection from '../OptionsSection';
import InfoSection from '../InfoSection';
import { useDurationCalculation } from '../../hooks/useDurationCalculation';
import { useToastStore } from '../../store/toastStore';
import { parseUiDate, getCurrentDateAsUiString } from '../../utils/dateUtils';

interface HomePageProps {
  initialStartDate?: string;
  initialEndDate?: string;
  initialStartTime?: string;
  initialEndTime?: string;
  initialIncludeLastDay?: boolean;
  initialResult?: any;
}

export default function HomePage({ 
  initialStartDate = getCurrentDateAsUiString(),
  initialEndDate = getCurrentDateAsUiString(),
  initialStartTime = '12 p.m.',
  initialEndTime = '12 p.m.',
  initialIncludeLastDay = false,
  initialResult
}: HomePageProps = {}) {
  const t = useTranslations('common');
  const tValidation = useTranslations('validation');
  const [includeLastDay, setIncludeLastDay] = useState(initialIncludeLastDay);
  const [businessDaysOnly, setBusinessDaysOnly] = useState(false);
  const [startDate, setStartDate] = useState(initialStartDate);
  const [startTime, setStartTime] = useState(initialStartTime); 
  const [endDate, setEndDate] = useState(initialEndDate);
  const [endTime, setEndTime] = useState(initialEndTime);
  const [activeDatePicker, setActiveDatePicker] = useState<'start' | 'end' | null>(null);
  const { result, loading, error, calculate } = useDurationCalculation();
  const { toasts, addToast, removeToast } = useToastStore();

  // Показать toast с ошибкой, если есть
  useEffect(() => {
    if (error) {
      addToast({
        type: 'error',
        title: tValidation('error'),
        message: tValidation(error),
        duration: 5000
      });
    }
  }, [error, addToast, tValidation]);

  // Автоматический пересчет при изменении параметров
  useEffect(() => {
    calculate({
      startDate,
      endDate,
      startTime,
      endTime,
      includeLastDay
    });
  }, [startDate, endDate, startTime, endTime, includeLastDay, calculate]);

  const handleRefresh = () => {
    calculate({
      startDate,
      endDate,
      startTime,
      endTime,
      includeLastDay
    });
  };

  const handleExport = async () => {
    try {
      // Валидация дат перед экспортом
      const start = parseUiDate(startDate);
      const end = parseUiDate(endDate);

      if (!start || !end) {
        addToast({
          type: 'error',
          title: tValidation('error'),
          message: tValidation('invalidDateFormat'),
          duration: 5000
        });
        return;
      }

      if (end < start) {
        addToast({
          type: 'error',
          title: tValidation('error'),
          message: tValidation('endDateBeforeStartDate'),
          duration: 5000
        });
        return;
      }

      const response = await fetch('/api/export/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startDate,
          endDate,
          startTime,
          endTime,
          includeLastDay
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create export');
      }

      const data = await response.json();
      
      // Copy to clipboard
      await navigator.clipboard.writeText(data.url);
      
      addToast({
        type: 'success',
        title: t('exportSuccess'),
        message: t('exportLinkCopied'),
        duration: 5000
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: tValidation('error'),
        message: tValidation('exportError'),
        duration: 5000
      });
    }
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
            days={(result || initialResult)?.days ?? 0}
            weeks={(result || initialResult)?.weeks ?? undefined}
            months={(result || initialResult)?.months ?? undefined}
            years={(result || initialResult)?.years ?? undefined}
            resultText={
              loading ? t('calculating') : undefined
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
