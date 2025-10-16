/**
 * Парсит строки дат в формате UI (например, '23 Sep, 2025') в объект Date
 * @param dateStr - строка даты в формате UI
 * @returns Date объект или null если дата некорректная
 */
export function parseUiDate(dateStr: string): Date | null {
  // Supports formats like '23 Sep, 2025' produced by DatePicker (en-GB with short month)
  // Normalize: remove commas
  const normalized = dateStr.replace(/,/g, '');
  if (!normalized) return null;
  
  const parsed = new Date(normalized);
  if (isNaN(parsed.getTime())) return null;
  
  // Check if date is reasonable (not too far in past/future)
  const minDate = new Date(1900, 0, 1);
  const maxDate = new Date(2100, 11, 31);
  
  if (parsed < minDate || parsed > maxDate) return null;
  
  // Zero-out time to compute whole days
  parsed.setHours(0, 0, 0, 0);
  return parsed;
}

/**
 * Возвращает текущую дату в формате UI (например, '23 Sep, 2025')
 * @returns строка с текущей датой в формате UI
 */
export function getCurrentDateAsUiString(): string {
  const today = new Date();
  return today.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
}

/**
 * Парсит время в формате '12 p.m.' или '12 a.m.' в часы (0-23)
 * @param timeStr - строка времени в формате UI
 * @returns число часов от 0 до 23
 */
export function parseTime(timeStr: string): number {
  if (!timeStr) return 12; // По умолчанию полдень
  
  const cleanTime = timeStr.trim().toLowerCase();
  const isPM = cleanTime.includes('p.m.') || cleanTime.includes('pm');
  const isAM = cleanTime.includes('a.m.') || cleanTime.includes('am');
  
  // Извлекаем число
  const match = cleanTime.match(/(\d{1,2})/);
  if (!match) return 12;
  
  let hours = parseInt(match[1], 10);
  
  if (isPM && hours !== 12) {
    hours += 12;
  } else if (isAM && hours === 12) {
    hours = 0;
  }
  
  return Math.max(0, Math.min(23, hours));
}

/**
 * Создает Date объект с учетом даты и времени
 * @param dateStr - строка даты в формате UI
 * @param timeStr - строка времени в формате UI (опционально)
 * @returns Date объект или null если дата некорректная
 */
export function createDateTime(dateStr: string, timeStr?: string): Date | null {
  const date = parseUiDate(dateStr);
  if (!date) return null;
  
  const hours = parseTime(timeStr || '12 p.m.');
  date.setHours(hours, 0, 0, 0);
  return date;
}