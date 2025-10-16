import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { parseSlug } from '../../api/export/create/route';
import { calculateDuration } from '../../../utils/durationUtils';
import HomePage from '../../../components/pages/HomePage';

interface ExportPageProps {
  params: {
    slug: string;
  };
}

// Генерируем метаданные для SEO
export async function generateMetadata({ params }: ExportPageProps): Promise<Metadata> {
  try {
    const { startDate, endDate, startTime, endTime, includeLastDay } = parseSlug(params.slug);
    
    const result = calculateDuration({
      startDate,
      endDate,
      startTime,
      endTime,
      includeLastDay
    });

    if ('error' in result) {
      return {
        title: 'Date Calculator - Export',
        description: 'Calculate the difference between two dates'
      };
    }

    const { days, weeks, months, years } = result;
    const durationText = [
      years && `${years} year${years > 1 ? 's' : ''}`,
      months && `${months} month${months > 1 ? 's' : ''}`,
      `${days} day${days !== 1 ? 's' : ''}`,
      weeks && weeks > 0 && `${weeks} week${weeks > 1 ? 's' : ''}`
    ].filter(Boolean).join(', ');

    const title = `Date Calculator: ${startDate} to ${endDate}${includeLastDay ? ' (inclusive)' : ''} - ${durationText}`;
    const description = `Calculate the duration between ${startDate} and ${endDate}${includeLastDay ? ' (inclusive)' : ''}. Result: ${durationText}.`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: 'website',
        siteName: 'Date Calculator',
        images: [
          {
            url: '/assets/img/logo.svg',
            width: 1200,
            height: 630,
            alt: 'Date Calculator'
          }
        ]
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: ['/assets/img/logo.svg']
      },
      alternates: {
        canonical: `/export/${params.slug}`
      }
    };
  } catch (error) {
    return {
      title: 'Date Calculator - Export',
      description: 'Calculate the difference between two dates'
    };
  }
}

// Генерируем структурированные данные
function generateStructuredData(slug: string, result: any) {
  if ('error' in result) return null;

  const { startDate, endDate, startTime, endTime, includeLastDay } = parseSlug(slug);
  const { days, weeks, months, years } = result;

  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Date Calculator',
    description: 'Calculate the difference between two dates',
    url: `https://yourdomain.com/export/${slug}`,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    featureList: [
      'Date difference calculation',
      'Multiple time units (days, weeks, months, years)',
      'Inclusive date range option',
      'SEO-friendly export links'
    ],
    result: {
      '@type': 'Duration',
      startDate,
      endDate,
      includeLastDay,
      days,
      weeks,
      months,
      years
    }
  };
}

export default function ExportPage({ params }: ExportPageProps) {
  try {
    // Парсим slug и получаем параметры
    const { startDate, endDate, startTime, endTime, includeLastDay } = parseSlug(params.slug);
    
    // Вычисляем результат
    const result = calculateDuration({
      startDate,
      endDate,
      startTime,
      endTime,
      includeLastDay
    });

    if ('error' in result) {
      notFound();
    }

    // Генерируем структурированные данные
    const structuredData = generateStructuredData(params.slug, result);

    return (
      <>
        {structuredData && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(structuredData)
            }}
          />
        )}
        <HomePage 
          initialStartDate={startDate}
          initialEndDate={endDate}
          initialStartTime={startTime}
          initialEndTime={endTime}
          initialIncludeLastDay={includeLastDay}
          initialResult={result}
        />
      </>
    );
  } catch (error) {
    notFound();
  }
}
