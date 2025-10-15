import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add or Subtract Days Calculator - Date Arithmetic Tool",
  description: "Add or subtract days, weeks, months, and years from any date. Calculate future or past dates with precision. Perfect for scheduling, planning, and date arithmetic.",
  keywords: "add days to date, subtract days from date, date arithmetic, future date calculator, past date calculator, date addition, date subtraction",
  openGraph: {
    title: "Add or Subtract Days Calculator - Date Arithmetic Tool",
    description: "Add or subtract days, weeks, months, and years from any date. Calculate future or past dates with precision.",
    type: "website",
  },
};

import SubstractPageClient from '../../components/pages/SubstractPageClient';
export default function SubstractPage() {
  return <SubstractPageClient />;
}
