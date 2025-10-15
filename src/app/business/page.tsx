import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Business Days Calculator - Calculate Working Days Between Dates",
  description: "Calculate business days between two dates, excluding weekends and holidays. Perfect for project planning, contract deadlines, and business scheduling. Get accurate working day counts.",
  keywords: "business days calculator, working days, project planning, contract deadlines, business scheduling, exclude weekends, exclude holidays",
  openGraph: {
    title: "Business Days Calculator - Calculate Working Days",
    description: "Calculate business days between two dates, excluding weekends and holidays. Perfect for project planning and business scheduling.",
    type: "website",
  },
};
import BusinessPageClient from '../../components/pages/BusinessPageClient';

export default function BusinessPage() {
  return <BusinessPageClient />;
}
