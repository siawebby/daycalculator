'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Icon, Button } from './ui';

interface DaysCounterProps {
  days: number;
  weeks?: number;
  months?: number;
  years?: number;
  additionalInfo?: string;
  excludedInfo?: {
    saturdays?: number;
    sundays?: number;
    holidays?: Array<{ name: string; count: number }>;
  };
  onRefresh?: () => void;
  onExport?: () => void;
  className?: string;
  variant?: 'default' | 'row';
  resultText?: string;
}

export const DaysCounter: React.FC<DaysCounterProps> = ({
  days,
  weeks,
  months, 
  years,
  additionalInfo,
  excludedInfo,
  onRefresh,
  onExport,
  className = '',
  variant = 'default',
  resultText
}) => {
  const t = useTranslations('common');
  const containerClass = variant === 'row' 
    ? `days-container days-container--row d-flex flex-column ${className}`
    : `days-container d-flex flex-column ${className}`;

  return (
    <div className={containerClass}>
      <div className="days-container__top">
        <span> 
          {t('result')} <Icon name="days_counter/arrow" size={variant === 'row' ? undefined : 'sm'} />
        </span>
      </div>
      <div className="days-container__bottom">
        <div className="day-number">
          {days} {t('days')}
        </div>
        {additionalInfo && (
          <div className="day-business">
            {additionalInfo}
          </div>
        )}
        <div className="day-options d-flex justify-content-between align-items-streetch">
          <div className="day-options__text d-flex flex-wrap align-items-center">
            {resultText ? (
              resultText
            ) : excludedInfo ? (
              <>
                {t('excluded')}
                {excludedInfo.saturdays && (
                  <>
                    <span>{excludedInfo.saturdays} {excludedInfo.saturdays !== 1 ? t('saturdays') : t('saturday')}</span>
                    {(excludedInfo.sundays || excludedInfo.holidays?.length) && <span>/</span>}
                  </>
                )}
                {excludedInfo.sundays && (
                  <>
                    <span>{excludedInfo.sundays} {excludedInfo.sundays !== 1 ? t('sundays') : t('sunday')}</span>
                    {excludedInfo.holidays?.length && <span>/</span>}
                  </>
                )}
                {excludedInfo.holidays?.map((holiday, index) => (
                  <span key={index}>
                    {holiday.count} {holiday.count !== 1 ? t('holidays') : t('holiday')} ({holiday.name})
                    {index < excludedInfo.holidays!.length - 1 && <span>/</span>}
                  </span>
                ))}
              </>
            ) : (
              <>
                {weeks && <span>{weeks} {t('weeks')}</span>}
                {weeks && months && <span>/</span>}
                {months && <span>{months} {t('months')}</span>}
                {months && years && <span>/</span>}
                {years && <span>{years} {t('years')}</span>}
              </>
            )}
          </div>
          <div className="day-options__buttons d-flex align-items-end">
            {onRefresh && (
              <Button className="refresh-btn" variant="refresh" onClick={onRefresh}>
                <Icon name="days_counter/refresh" />
              </Button>
            )}
            {onExport && (
              <Button onClick={onExport} variant="export">
                <Icon name="days_counter/export" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
