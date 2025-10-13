'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';

interface TimePickerProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  isActive?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
}

// Вспомогательная функция: парсинг строкового времени в 12-часовом формате типа "06:28 PM"
function parseTime(value: string) {
  // Поддержим несколько возможных входов: "06:28 PM", "6:28 pm", "12 p.m.", "12 a.m."
  const normalized = value
    .replace(/\./g, '')
    .trim()
    .toUpperCase()
    .replace(/\s+/g, ' ')
    .replace('P M', 'PM')
    .replace('A M', 'AM')
    .replace('PM', ' PM')
    .replace('AM', ' AM');

  const meridianMatch = /(AM|PM)$/.exec(normalized);
  const meridian = meridianMatch ? (meridianMatch[1] as 'AM' | 'PM') : 'AM';

  const timePart = normalized.replace(/\s*(AM|PM)$/, '');
  const parts = timePart.split(':');
  const hours = Math.min(12, Math.max(1, parseInt(parts[0] || '12', 10) || 12));
  const minutes = Math.min(59, Math.max(0, parseInt(parts[1] || '0', 10) || 0));
  return { hours, minutes, meridian } as { hours: number; minutes: number; meridian: 'AM' | 'PM' };
}

export const TimePicker: React.FC<TimePickerProps> = ({
  value,
  onChange,
  className = '',
  isActive = false,
  onClose,
  onOpen
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hoursRef = useRef<HTMLDivElement>(null);
  const minutesRef = useRef<HTMLDivElement>(null);
  const meridiansRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Списки значений
  const hours = useMemo(() => Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0')), []);
  const minutes = useMemo(() => Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0')), []);
  const meridians = ['AM', 'PM'] as const;

  const parsed = parseTime(value || '12:00 PM');
  const [hourIdx, setHourIdx] = useState(() => (parsed.hours - 1));
  const [minuteIdx, setMinuteIdx] = useState(() => parsed.minutes);
  const [meridianIdx, setMeridianIdx] = useState(() => (parsed.meridian === 'AM' ? 0 : 1));

  // Синхронизация с внешним isActive
  useEffect(() => {
    // Только открываем, если isActive = true, но не закрываем принудительно
    if (isActive) {
      setIsOpen(true);
      // Скроллим к активным элементам при открытии
      setTimeout(() => {
        // Скроллим к текущим индексам напрямую
        if (hoursRef.current) {
          const itemHeight = 56; // высота одного элемента
          hoursRef.current.scrollTop = hourIdx * itemHeight - itemHeight; // центрируем активный элемент
        }
        if (minutesRef.current) {
          const itemHeight = 56;
          minutesRef.current.scrollTop = minuteIdx * itemHeight - itemHeight;
        }
        if (meridiansRef.current) {
          const itemHeight = 56;
          meridiansRef.current.scrollTop = meridianIdx * itemHeight - itemHeight;
        }
      }, 50); // увеличиваем задержку для корректного рендера
    }
  }, [isActive, hourIdx, minuteIdx, meridianIdx]);

  // Закрытие при клике вне
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        onClose?.();
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  // Синхронизация с внешним value
  useEffect(() => {
    if (!value) return;
    const p = parseTime(value);
    setHourIdx(p.hours - 1);
    setMinuteIdx(p.minutes);
    setMeridianIdx(p.meridian === 'AM' ? 0 : 1);
  }, [value]);

  // Обновление скролла при изменении индексов
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        if (hoursRef.current) {
          const itemHeight = 56;
          hoursRef.current.scrollTop = hourIdx * itemHeight - itemHeight;
        }
        if (minutesRef.current) {
          const itemHeight = 56;
          minutesRef.current.scrollTop = minuteIdx * itemHeight - itemHeight;
        }
        if (meridiansRef.current) {
          const itemHeight = 56;
          meridiansRef.current.scrollTop = meridianIdx * itemHeight - itemHeight;
        }
      }, 10);
    }
  }, [isOpen, hourIdx, minuteIdx, meridianIdx]);

  const format = (hIndex: number, mIndex: number, merIndex: number) => {
    const h = hours[hIndex];
    const m = minutes[mIndex];
    const mer = meridians[merIndex];
    return `${h}:${m} ${mer}`;
  };

  const handleSelect = (type: 'h' | 'm' | 'mer', index: number, event: React.MouseEvent) => {
    event.stopPropagation(); // Предотвращаем всплытие события
    event.preventDefault(); // Предотвращаем стандартное поведение
    
    if (type === 'h') setHourIdx(index);
    if (type === 'm') setMinuteIdx(index);
    if (type === 'mer') setMeridianIdx(index);

    const next = format(type === 'h' ? index : hourIdx, type === 'm' ? index : minuteIdx, type === 'mer' ? index : meridianIdx);
    onChange(next);
    
    // Не закрываем сразу, позволяем пользователю выбрать все значения
    // setIsOpen(false);
    // onClose?.();
  };

  const cssClasses = `time-picker ${isOpen ? 'time-picker--active' : ''} ${className}`;

  // Визуально: три вертикальных списка, показаны только 3 строки по высоте.
  // Центральная строка — активная, верхняя и нижняя — соседние, есть разделители на всю ширину.

  return (
    <div className={cssClasses} ref={containerRef}>
      <div
        className="time-picker__input"
        onClick={() => {
          if (!isOpen) {
            setIsOpen(true);
            onOpen?.();
          }
        }}
      >
        <span className={!value ? 'placeholder' : ''}>{value || 'Select time'}</span>
      </div>

      {isOpen && (
        <div className="time-picker__dropdown" onClick={(e) => e.stopPropagation()}>
          <div className="time-picker__viewport">
             <div className="time-picker__column" ref={hoursRef}>
               {hours.map((h, idx) => (
                 <div
                   key={h + idx}
                   className={`time-picker__item d-flex align-items-center justify-content-center ${idx === hourIdx ? 'active' : ''}`}
                   onClick={(e) => handleSelect('h', idx, e)}
                   onMouseDown={(e) => e.stopPropagation()}
                 >
                   {h}
                 </div>
               ))} 
             </div>
             <div className="time-picker__separator d-flex align-items-center justify-content-center">:</div>
             <div className="time-picker__column" ref={minutesRef}>
               {minutes.map((m, idx) => (
                 <div
                   key={m + idx}
                   className={`time-picker__item d-flex align-items-center justify-content-center ${idx === minuteIdx ? 'active' : ''}`}
                   onClick={(e) => handleSelect('m', idx, e)}
                   onMouseDown={(e) => e.stopPropagation()}
                 >
                   {m}
                 </div>
               ))}
             </div>
             <div className="time-picker__column time-picker__column--meridian" ref={meridiansRef}>
               {meridians.map((mer, idx) => (
                 <div
                   key={mer}
                   className={`time-picker__item d-flex align-items-center justify-content-center ${idx === meridianIdx ? 'active' : ''}`}
                   onClick={(e) => handleSelect('mer', idx, e)}
                   onMouseDown={(e) => e.stopPropagation()}
                 >
                   {mer}
                 </div>
               ))}
             </div>
          </div>
          <div className="time-picker__overlay" />
        </div>
      )}
    </div>
  );
};


