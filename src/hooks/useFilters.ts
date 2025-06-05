import { useState, useCallback } from 'react';

export interface FilterHookOptions<T> {
  onApply?: (filters: T) => Promise<void>;
  onReset?: () => void;
}

export const useFilters = <T extends Record<string, any>>(
  initialFilters: T,
  options: FilterHookOptions<T> = {}
) => {
  const [filters, setFilters] = useState<T>(initialFilters);
  const [isApplying, setIsApplying] = useState(false);

  const updateFilter = useCallback((key: keyof T, value: T[keyof T]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const applyFilters = useCallback(async () => {
    if (!options.onApply) return;
    
    setIsApplying(true);
    try {
      await options.onApply(filters);
    } catch (error) {
      console.error('Filter application failed:', error);
      throw error;
    } finally {
      setIsApplying(false);
    }
  }, [filters, options.onApply]);

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
    options.onReset?.();
  }, [initialFilters, options.onReset]);

  return {
    filters,
    updateFilter,
    applyFilters,
    resetFilters,
    isApplying
  };
}