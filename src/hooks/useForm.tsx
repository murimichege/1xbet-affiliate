import { useState, useCallback } from 'react';

export interface UseFormReturn<T> {
  values: T;
  updateValue: (key: keyof T, value: T[keyof T]) => void;
  reset: (newValues?: Partial<T>) => void;
  validate: () => boolean;
}

export const useForm = <T extends Record<string, any>>(
  initialValues: T
): UseFormReturn<T> => {
  const [values, setValues] = useState<T>(initialValues);

  const updateValue = useCallback((key: keyof T, value: T[keyof T]) => {
    setValues(prev => ({ ...prev, [key]: value }));
  }, []);

  const reset = useCallback((newValues?: Partial<T>) => {
    const resetValues = newValues ? { ...initialValues, ...newValues } : initialValues;
    setValues(resetValues);
  }, [initialValues]);

  const validate = useCallback(() => {
    // Simple validation - check for required fields
    return Object.values(values).every(value => 
      value !== '' && value !== null && value !== undefined
    );
  }, [values]);

  return {
    values,
    updateValue,
    reset,
    validate
  };
};