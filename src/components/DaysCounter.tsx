'use client';

import React from 'react';
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
  const containerClass = variant === 'row' 
    ? `days-container days-container--row d-flex flex-column ${className}`
    : `days-container d-flex flex-column ${className}`;

  return (
    <div className={containerClass}>
      <div className="days-container__top">
        <span> 
          Result <Icon name="days_counter/arrow" size={variant === 'row' ? undefined : 'sm'} />
        </span>
      </div>
      <div className="days-container__bottom">
        <div className="day-number">
          {days} days
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
                Excluded:
                {excludedInfo.saturdays && (
                  <>
                    <span>{excludedInfo.saturdays} Saturday{excludedInfo.saturdays !== 1 ? 's' : ''}</span>
                    {(excludedInfo.sundays || excludedInfo.holidays?.length) && <span>/</span>}
                  </>
                )}
                {excludedInfo.sundays && (
                  <>
                    <span>{excludedInfo.sundays} Sunday{excludedInfo.sundays !== 1 ? 's' : ''}</span>
                    {excludedInfo.holidays?.length && <span>/</span>}
                  </>
                )}
                {excludedInfo.holidays?.map((holiday, index) => (
                  <span key={index}>
                    {holiday.count} holiday{holiday.count !== 1 ? 's' : ''} ({holiday.name})
                    {index < excludedInfo.holidays!.length - 1 && <span>/</span>}
                  </span>
                ))}
              </>
            ) : (
              <>
                {weeks && <span>{weeks} weeks</span>}
                {weeks && months && <span>/</span>}
                {months && <span>{months} months</span>}
                {months && years && <span>/</span>}
                {years && <span>{years} years</span>}
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
