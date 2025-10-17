import { parseUiDate, parseTime, createDateTime } from './dateUtils';

export type DurationRequest = {
  startDate: string; // e.g., '23 Sep, 2025'
  endDate: string;   // e.g., '24 Sep, 2025'
  startTime?: string; // e.g., '12 p.m.'
  endTime?: string;   // e.g., '12 p.m.'
  includeLastDay?: boolean;
};


function daysBetween(start: Date, end: Date, includeLastDay: boolean): number {
  const msPerDay = 24 * 60 * 60 * 1000;
  const diffMs = end.getTime() - start.getTime();
  
  // Если даты одинаковые, возвращаем 0 дней (независимо от includeLastDay)
  if (diffMs === 0) {
    return 0;
  }
  
  // Обычная разница - только полные сутки
  const baseDays = Math.floor(diffMs / msPerDay);
  
  // Если includeLastDay включен, проверяем есть ли любой остаток времени
  if (includeLastDay) {
    const remainderMs = diffMs % msPerDay;
    // Если есть любой остаток времени (даже 1 час), добавляем день
    if (remainderMs > 0) {
      return baseDays + 1;
    }
  }
  
  return baseDays;
}

export interface DurationResult {
  days: number;
  weeks: number | null;
  months: number | null;
  years: number | null;
}

export interface DurationError {
  error: string;
}

export type DurationResponse = DurationResult | DurationError;

export function calculateDuration(params: DurationRequest): DurationResponse {
  try {
    // Parse dates with time
    const start = createDateTime(params.startDate, params.startTime);
    const end = createDateTime(params.endDate, params.endTime);

    if (!start || !end) {
      return { error: 'invalidDateFormat' };
    }

    // Check for negative date range (end before start)
    if (end < start) {
      return { error: 'endDateBeforeStartDate' };
    }

    const includeLastDay = params.includeLastDay || false;

    const numDays = daysBetween(start, end, includeLastDay);

    // Calculate months and years more accurately
    const calculateMonthsAndYears = (startDate: Date, endDate: Date) => {
      let years = endDate.getFullYear() - startDate.getFullYear();
      let months = endDate.getMonth() - startDate.getMonth();
      
      // Adjust if the end day is before the start day
      if (endDate.getDate() < startDate.getDate()) {
        months--;
      }
      
      // Adjust years if months went negative
      if (months < 0) {
        years--;
        months += 12;
      }
      
      // Calculate total months including years
      const totalMonths = years * 12 + months;
      
      return { years, months: totalMonths };
    };

    const { years, months } = calculateMonthsAndYears(start, end);

    const weeks = numDays >= 0 ? Math.floor(numDays / 7) : Math.ceil(numDays / 7);

    return {
      days: numDays,
      weeks: weeks > 0 ? weeks : null,
      months: months > 0 ? months : null,
      years: years > 0 ? years : null,
    };
  } catch (err) {
    return { error: 'calculationError' };
  }
}
