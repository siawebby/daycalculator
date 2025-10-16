'use client';

import { useState, useCallback } from 'react';
import { calculateDuration, type DurationRequest, type DurationResponse } from '../utils/durationUtils';

export const useDurationCalculation = () => {
  const [result, setResult] = useState<DurationResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculate = useCallback((payload: DurationRequest) => {
    setLoading(true);
    setError(null);
    
    try {
      const calculatedResult = calculateDuration(payload);
      
      if ('error' in calculatedResult) {
        setError(calculatedResult.error);
        setResult(null);
      } else {
        setResult(calculatedResult);
        setError(null);
      }
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Unknown error';
      setError(message);
      setResult(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
    setLoading(false);
  }, []);

  return { 
    result, 
    loading, 
    error, 
    calculate, 
    reset 
  };
};
