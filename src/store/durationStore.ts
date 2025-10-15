'use client';

import { create } from 'zustand';

type DurationRequest = {
  startDate: string;
  endDate: string;
  includeLastDay: boolean;
};

type DurationResponse = {
  days: number;
  weeks: number | null;
  months: number | null;
  years: number | null;
};

type DurationState = {
  loading: boolean;
  error: string | null;
  result: DurationResponse | null;
  calculate: (payload: DurationRequest) => Promise<void>;
};

export const useDurationStore = create<DurationState>((set) => ({
  loading: false,
  error: null,
  result: null,
  async calculate(payload) {
    set({ loading: true, error: null });
    try {
      const res = await fetch('/api/duration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || 'Request failed');
      }
      const data = (await res.json()) as DurationResponse;
      set({ result: data, loading: false });
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Unknown error';
      set({ error: message, loading: false });
    }
  }
}));


