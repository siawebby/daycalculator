import { NextRequest, NextResponse } from 'next/server';
import { getTranslations } from 'next-intl/server';
import { parseTime } from '../../../../utils/dateUtils';

type ExportRequest = {
  startDate: string;
  endDate: string;
  startTime?: string;
  endTime?: string;
  includeLastDay?: boolean;
};

// Функция для создания SEO-friendly slug
function createSlug(startDate: string, endDate: string, startTime?: string, endTime?: string, includeLastDay: boolean = false): string {
  // Парсим даты и преобразуем в формат день-месяц-год
  const parseDateToSlug = (dateStr: string): string => {
    const normalized = dateStr.trim().replace(/,/g, '');
    const date = new Date(normalized);
    
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date format');
    }
    
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleDateString('en-GB', { month: 'short' }).toLowerCase();
    const year = date.getFullYear();
    
    return `${day}-${month}-${year}`;
  };

  // Парсим время в формат для slug
  const parseTimeToSlug = (timeStr?: string): string => {
    if (!timeStr || timeStr === '12 p.m.') return ''; // По умолчанию не добавляем время
    
    const hours = parseTime(timeStr);
    return `-${hours.toString().padStart(2, '0')}h`;
  };

  try {
    const startSlug = parseDateToSlug(startDate) + parseTimeToSlug(startTime);
    const endSlug = parseDateToSlug(endDate) + parseTimeToSlug(endTime);
    const inclusiveSuffix = includeLastDay ? '-inclusive' : '';
    
    return `${startSlug}-to-${endSlug}${inclusiveSuffix}`;
  } catch (error) {
    throw new Error('Failed to create slug from dates');
  }
}

// Функция для парсинга slug обратно в параметры
export function parseSlug(slug: string): { startDate: string; endDate: string; startTime?: string; endTime?: string; includeLastDay: boolean } {
  const isInclusive = slug.endsWith('-inclusive');
  const cleanSlug = isInclusive ? slug.slice(0, -10) : slug; // убираем '-inclusive'
  
  const parts = cleanSlug.split('-to-');
  if (parts.length !== 2) {
    throw new Error('Invalid slug format');
  }
  
  const parseSlugToDateAndTime = (slugPart: string): { date: string; time?: string } => {
    // Проверяем, есть ли время в формате -XXh
    const timeMatch = slugPart.match(/-(\d{2})h$/);
    let timeStr: string | undefined;
    
    if (timeMatch) {
      const hours = parseInt(timeMatch[1], 10);
      if (hours === 12) {
        timeStr = '12 p.m.';
      } else if (hours === 0) {
        timeStr = '12 a.m.';
      } else if (hours < 12) {
        timeStr = `${hours} a.m.`;
      } else {
        timeStr = `${hours - 12} p.m.`;
      }
      // Убираем время из slugPart
      slugPart = slugPart.replace(/-(\d{2})h$/, '');
    }
    
    const [day, month, year] = slugPart.split('-');
    const monthMap: { [key: string]: string } = {
      'jan': 'Jan', 'feb': 'Feb', 'mar': 'Mar', 'apr': 'Apr',
      'may': 'May', 'jun': 'Jun', 'jul': 'Jul', 'aug': 'Aug',
      'sep': 'Sep', 'oct': 'Oct', 'nov': 'Nov', 'dec': 'Dec'
    };
    
    const fullMonth = monthMap[month.toLowerCase()];
    if (!fullMonth) {
      throw new Error('Invalid month in slug');
    }
    
    return {
      date: `${day} ${fullMonth}, ${year}`,
      time: timeStr
    };
  };
  
  const startData = parseSlugToDateAndTime(parts[0]);
  const endData = parseSlugToDateAndTime(parts[1]);
  
  return {
    startDate: startData.date,
    endDate: endData.date,
    startTime: startData.time,
    endTime: endData.time,
    includeLastDay: isInclusive
  };
}

export async function POST(request: NextRequest) {
  try {
    const t = await getTranslations('validation');
    
    // Валидация запроса
    let body: ExportRequest;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        { error: t('invalidJson') },
        { status: 400 }
      );
    }

    // Валидация обязательных полей
    if (!body.startDate || !body.endDate) {
      return NextResponse.json(
        { error: t('startDateRequired') },
        { status: 400 }
      );
    }

    // Создаём slug
    const slug = createSlug(
      body.startDate, 
      body.endDate, 
      body.startTime,
      body.endTime,
      body.includeLastDay || false
    );

    // Проверяем, существует ли уже такая ссылка в кэше
    const cacheResponse = await fetch(`${request.nextUrl.origin}/api/cache?key=${encodeURIComponent(slug)}`);
    
    if (cacheResponse.ok) {
      // Ссылка уже существует, возвращаем её
      return NextResponse.json({
        slug,
        url: `${request.nextUrl.origin}/export/${slug}`,
        cached: true
      });
    }

    // Сохраняем данные в кэш
    const cacheData = {
      startDate: body.startDate,
      endDate: body.endDate,
      startTime: body.startTime,
      endTime: body.endTime,
      includeLastDay: body.includeLastDay || false,
      createdAt: new Date().toISOString()
    };

    const saveResponse = await fetch(`${request.nextUrl.origin}/api/cache`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key: slug,
        data: cacheData
      })
    });

    if (!saveResponse.ok) {
      throw new Error('Failed to save to cache');
    }

    return NextResponse.json({
      slug,
      url: `${request.nextUrl.origin}/export/${slug}`,
      cached: false
    });

  } catch (error) {
    const t = await getTranslations('validation');
    return NextResponse.json(
      { error: t('calculationError') },
      { status: 500 }
    );
  }
}
