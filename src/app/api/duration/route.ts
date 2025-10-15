import { NextResponse } from 'next/server';

type DurationRequest = {
  startDate: string; // e.g., '23 Sep, 2025'
  endDate: string;   // e.g., '24 Sep, 2025'
  includeLastDay?: boolean;
};

function parseUiDate(dateStr: string): Date | null {
  // Supports formats like '23 Sep, 2025' produced by DatePicker (en-GB with short month)
  // Normalize: remove commas
  const normalized = dateStr?.trim().replace(/,/g, '');
  if (!normalized) return null;
  const parsed = new Date(normalized);
  if (isNaN(parsed.getTime())) return null;
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
    const body = (await request.json()) as DurationRequest;
    if (!body?.startDate || !body?.endDate) {
      return NextResponse.json(
        { error: 'startDate and endDate are required' },
        { status: 400 }
      );
    }

    const includeLastDay = Boolean(body.includeLastDay);
    const start = parseUiDate(body.startDate);
    const end = parseUiDate(body.endDate);

    if (!start || !end) {
      return NextResponse.json(
        { error: 'Invalid date format. Expected like: 23 Sep, 2025' },
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
    return NextResponse.json(
      { error: 'Failed to compute duration' },
      { status: 500 }
    );
  }
}


