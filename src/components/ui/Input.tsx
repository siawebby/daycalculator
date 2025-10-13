'use client';

import React from 'react';
import { DatePicker } from './DatePicker';
import { TimePicker } from './TimePicker';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'date' | 'time' | 'day' | 'text';
  onDateChange?: (value: string) => void;
  isActive?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
}

export const Input: React.FC<InputProps> = ({ 
  variant = 'text', 
  className = '', 
  onDateChange,
  isActive = false,
  onClose,
  onOpen,
  ...props 
}) => {
  const baseClasses = 'input-base';
  const variantClasses = {
    date: 'input-date',
    time: 'input-time', 
    day: 'input-day',
    text: 'input-text'
  };

  // Для variant="date" используем DatePicker
  if (variant === 'date' && onDateChange) {
    return (
      <DatePicker
        value={props.value as string || ''}
        onChange={onDateChange}
        className={`${className}`}
        isActive={isActive}
        onClose={onClose}
        onOpen={onOpen}
      /> 
    );
  }

  // Для variant="time" используем TimePicker (интерфейс onChange как у input)
  if (variant === 'time' && typeof props.value === 'string' && props.onChange) {
    return (
      <TimePicker
        value={(props.value as string) || ''}
        onChange={(val) => {
          // Сгенерируем искусственное событие для совместимости с существующими страницами
          const syntheticEvent = {
            target: { value: val }
          } as unknown as React.ChangeEvent<HTMLInputElement>;
          props.onChange!(syntheticEvent);
        }}
        className={`${className}`}
        isActive={isActive}
        onClose={onClose}
        onOpen={onOpen}
      />
    );
  }
  
  // Для variant="day" добавляем ограничения на ввод
  const handleDayInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (variant === 'day') {
      // Удаляем все символы кроме цифр
      let value = e.target.value.replace(/\D/g, '');
      
      // Ограничиваем до 2 цифр
      if (value.length > 2) {
        value = value.slice(0, 2);
      }
      
      // Создаем новое событие с отфильтрованным значением
      const syntheticEvent = {
        ...e,
        target: {
          ...e.target,
          value: value
        }
      };
      
      // Вызываем оригинальный onChange если он есть
      if (props.onChange) {
        props.onChange(syntheticEvent);
      }
    } else if (props.onChange) {
      props.onChange(e);
    }
  };

  return (
    <input 
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
      onChange={variant === 'day' ? handleDayInput : props.onChange}
    />
  );
};
