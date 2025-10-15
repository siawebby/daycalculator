import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Days Since Calculator - Calculate Time Since or Until Date",
  description: "Calculate how many days have passed since a specific date or how many days until a future date. Perfect for tracking time since events, anniversaries, and milestones.",
  keywords: "days since calculator, time since date, days until date, anniversary calculator, milestone tracker, date tracker",
  openGraph: {
    title: "Days Since Calculator - Calculate Time Since or Until Date",
    description: "Calculate how many days have passed since a specific date or how many days until a future date.",
    type: "website",
  },
};

import SincePageClient from '../../components/pages/SincePageClient';
export default function SincePage() {
  return <SincePageClient />;
}
