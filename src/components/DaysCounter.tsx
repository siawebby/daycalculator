'use client';

import React from 'react';
import { Icon } from './ui/Icon';

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
  className = ''
}) => {
  return (
    <div className={`days-container d-flex flex-column ${className}`}>
      <div className="days-container__top">
        <a href="#">
          Result <Icon name="days_counter/arrow" size='sm' />
        </a>
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
            {excludedInfo ? (
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
              <button className="refresh-btn" onClick={onRefresh}>
                <Icon name="days_counter/refresh" />
              </button>
            )}
            {onExport && (
              <button onClick={onExport}>
                <Icon name="days_counter/export" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
