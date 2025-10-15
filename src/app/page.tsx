import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Day Calculator - Calculate Days Between Dates | Free Online Tool",
  description: "Free online day calculator to calculate days between dates, business days, and countdown timers. Perfect for project planning, deadline tracking, and date calculations.",
  keywords: "day calculator, date calculator, business days, countdown timer, days between dates, project planning, deadline calculator",
  openGraph: {
    title: "Day Calculator - Calculate Days Between Dates",
    description: "Free online day calculator to calculate days between dates, business days, and countdown timers.",
    type: "website",
  },
};

import HomePage from '../components/pages/HomePage';

export default function Page() {
  return <HomePage />;
}