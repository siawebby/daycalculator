'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Icon } from './Icon';

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  isActive?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  placeholder = 'Select date',
  className = '',
  isActive = false,
  onClose,
  onOpen
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    value ? new Date(value) : null
  );
  const [showYearPicker, setShowYearPicker] = useState(false);
  const datePickerRef = useRef<HTMLDivElement>(null);
  
  // isOpen теперь управляется через isActive
  const isOpen = isActive;

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  // Закрытие календаря при клике вне его
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        onClose?.();
      }
    };

    if (isActive) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose, isActive]);

  // Обновление selectedDate при изменении value
  useEffect(() => {
    if (value) {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        setSelectedDate(date);
        setCurrentMonth(date);
      }
    } else {
      setSelectedDate(null);
    }
  }, [value]);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Добавляем пустые ячейки для дней предыдущего месяца
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Добавляем дни текущего месяца
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    const formattedDate = date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
    onChange(formattedDate);
    onClose?.();
  };

  const handlePrevMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1));
  };

  const handleYearSelect = (year: number) => {
    setCurrentMonth(prev => new Date(year, prev.getMonth()));
    setShowYearPicker(false);
  };

  const toggleYearPicker = () => {
    setShowYearPicker(!showYearPicker);
  };

  const generateYearRange = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear - 50; year <= currentYear + 50; year++) {
      years.push(year);
    }
    return years;
  };

  const formatDisplayValue = (date: Date | null) => {
    if (!date) return '';
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date) => {
    if (!selectedDate) return false;
    return date.toDateString() === selectedDate.toDateString();
  }; 

  const days = getDaysInMonth(currentMonth);

  const cssClasses = `date-picker ${isActive ? 'date-picker--active' : ''} ${className}`;
  
  return (
    <div className={cssClasses} ref={datePickerRef}>
      <div 
        className="date-picker__input" 
        onClick={() => {
          if (!isActive) {
            onOpen?.();
          }
        }}
      >   
        <span className={!selectedDate ? 'placeholder' : ''}>
          {selectedDate ? formatDisplayValue(selectedDate) : placeholder}
        </span>
      </div>
      
      {isOpen && ( 
        <div className="date-picker__calendar">
          <div className="date-picker__header d-flex align-items-center justify-content-between">
            <div 
              className="date-picker__month-year d-flex align-items-center"
              onClick={toggleYearPicker}
              style={{ cursor: 'pointer' }}
            >
              {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              <Icon name="calendar/year_arrow" size="sm" />
            </div> 
            {!showYearPicker && (
              <div className="date-picker__navigation d-flex">
                <button 
                  className="date-picker__nav-btn d-flex align-items-center justify-content-center"
                  onClick={handlePrevMonth}
                >
                  <Icon name="calendar/month_prev" size="md" />
                </button>
                <button  
                  className="date-picker__nav-btn d-flex align-items-center justify-content-center"
                  onClick={handleNextMonth} 
                >
                  <Icon name="calendar/month_next" size="md" />
                </button>
              </div>
            )}
          </div>
          
          {!showYearPicker ? (
            <>
              <div className="date-picker__days-header">
                {daysOfWeek.map((day, index) => (
                  <div key={index} className="date-picker__day-header">
                    {day}
                  </div>
                ))}
              </div> 
              
              <div className="date-picker__days">
                {days.map((date, index) => (
                  <div 
                    key={index}
                    className={`date-picker__day d-flex align-items-center justify-content-center ${
                      !date ? 'empty' : ''
                    } ${
                      date && isToday(date) ? 'today' : ''
                    } ${
                      date && isSelected(date) ? 'selected' : ''
                    }`}
                    onClick={() => date && handleDateSelect(date)}
                  >
                    {date ? date.getDate() : ''}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="date-picker__year-picker">
              <div className="date-picker__year-list">
                {generateYearRange().map(year => (
                  <div
                    key={year}
                    className={`date-picker__year-item ${
                      year === currentMonth.getFullYear() ? 'selected' : ''
                    }`}
                    onClick={() => handleYearSelect(year)}
                  >
                    {year}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
