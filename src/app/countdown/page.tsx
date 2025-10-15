import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Countdown Timer - Days Until Event Calculator | Free Online Tool",
  description: "Create countdown timers and calculate days remaining until important events, birthdays, holidays, and deadlines. Free online countdown calculator with custom event labels.",
  keywords: "countdown timer, days until, event countdown, birthday countdown, holiday countdown, deadline countdown, event calculator",
  openGraph: {
    title: "Countdown Timer - Days Until Event Calculator",
    description: "Create countdown timers and calculate days remaining until important events, birthdays, holidays, and deadlines.",
    type: "website",
  },
};
import CountdownPageClient from '../../components/pages/CountdownPageClient';

export default function CountdownPage() {
  return <CountdownPageClient />;
}
