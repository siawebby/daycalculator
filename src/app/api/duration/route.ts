import { NextResponse } from 'next/server';
import { getTranslations } from 'next-intl/server';

type DurationRequest = {
  startDate: string; // e.g., '23 Sep, 2025'
  endDate: string;   // e.g., '24 Sep, 2025'
  includeLastDay?: boolean;
};

// Validation functions
function isValidString(value: any): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function isValidBoolean(value: any): value is boolean {
  return typeof value === 'boolean';
}

function sanitizeInput(input: string): string {
  // Remove potentially dangerous characters and limit length
  return input
    .replace(/[<>\"'&]/g, '') // Remove HTML/script injection characters
    .substring(0, 100) // Limit length
    .trim();
}

function parseUiDate(dateStr: string): Date | null {
  // Validate input first
  if (!isValidString(dateStr)) return null;
  
  // Sanitize input
  const sanitized = sanitizeInput(dateStr);
  
  // Supports formats like '23 Sep, 2025' produced by DatePicker (en-GB with short month)
  // Normalize: remove commas
  const normalized = sanitized.replace(/,/g, '');
  if (!normalized) return null;
  
  const parsed = new Date(normalized);
  if (isNaN(parsed.getTime())) return null;
  
  // Check if date is reasonable (not too far in past/future)
  const now = new Date();
  const minDate = new Date(1900, 0, 1);
  const maxDate = new Date(2100, 11, 31);
  
  if (parsed < minDate || parsed > maxDate) return null;
  
  // Zero-out time to compute whole days
  parsed.setHours(0, 0, 0, 0);
  return parsed;
}

function daysBetween(start: Date, end: Date, includeLastDay: boolean): number {
  const msPerDay = 24 * 60 * 60 * 1000;
  const diffMs = end.getTime() - start.getTime();
  const baseDays = Math.floor(diffMs / msPerDay);
  // If includeLastDay, add 1 day if the range is valid (end >= start)
  if (includeLastDay && diffMs >= 0) {
    return baseDays + 1;
  }
  return baseDays;
}

export async function POST(request: Request) {
  try {
    // Get translations
    const t = await getTranslations('validation');
    
    // Validate request body
    let body: any;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        { error: t('invalidJson') },
        { status: 400 }
      );
    }

    // Validate request structure
    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { error: t('requestBodyObject') },
        { status: 400 }
      );
    }

    // Validate required fields
    if (!isValidString(body.startDate)) {
      return NextResponse.json(
        { error: t('startDateRequired') },
        { status: 400 }
      );
    }

    if (!isValidString(body.endDate)) {
      return NextResponse.json(
        { error: t('endDateRequired') },
        { status: 400 }
      );
    }

    // Validate optional fields
    const includeLastDay = body.includeLastDay !== undefined 
      ? isValidBoolean(body.includeLastDay) 
      : false;

    if (body.includeLastDay !== undefined && !isValidBoolean(body.includeLastDay)) {
      return NextResponse.json(
        { error: t('includeLastDayBoolean') },
        { status: 400 }
      );
    }

    // Parse and validate dates
    const start = parseUiDate(body.startDate);
    const end = parseUiDate(body.endDate);

    if (!start) {
      return NextResponse.json(
        { error: t('invalidDateFormat') },
        { status: 400 }
      );
    }

    if (!end) {
      return NextResponse.json(
        { error: t('invalidDateFormat') },
        { status: 400 }
      );
    }

    // Check for negative date range (end before start)
    if (end < start) {
      return NextResponse.json(
        { error: t('endDateBeforeStartDate') },
        { status: 400 }
      );
    }

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

    const result = {
      days: numDays,
      weeks: numDays >= 0 ? Math.floor(numDays / 7) : Math.ceil(numDays / 7),
      months: months > 0 ? months : null,
      years: years > 0 ? years : null,
    };

    return NextResponse.json(result);
  } catch (err) {
    const t = await getTranslations('validation');
    return NextResponse.json(
      { error: t('calculationError') },
      { status: 500 }
    );
  }
}


