import { useState, useEffect } from 'react';
import { countryService } from '@/services/countryService';
import { Country } from '@/types/countries';

export const useCountries = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCountries = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await countryService.getAll();
        setCountries(data);
      } catch (err) {
        setError('Failed to load countries');
        console.error('Error loading countries:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCountries();
  }, []);



  return { 
    countries, 
    loading, 
    error
  };
};