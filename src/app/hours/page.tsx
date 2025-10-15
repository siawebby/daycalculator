import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hours Calculator - Calculate Hours Since or Until Date",
  description: "Calculate hours since a specific date or hours until a future date. Perfect for tracking time in hours, work shifts, and precise time calculations.",
  keywords: "hours calculator, hours since date, hours until date, time calculator, work hours, shift calculator, precise time tracking",
  openGraph: {
    title: "Hours Calculator - Calculate Hours Since or Until Date",
    description: "Calculate hours since a specific date or hours until a future date. Perfect for tracking time in hours and work shifts.",
    type: "website",
  },
};

import HoursPageClient from '../../components/pages/HoursPageClient';
export default function HoursPage() {
  return <HoursPageClient />;
}
