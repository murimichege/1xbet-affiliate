import { countryApiClient } from '@/config/api';
import { Country } from '@/types/countries';
let countriesCache: Country[] | null = null;

export const countryService = {
  async getAll(): Promise<Country[]> {
    if (countriesCache) {
      return countriesCache;
    }

    try {
      const response = await countryApiClient.get('/all?fields=name,cca2,flag');
      
      const countries = response.data
        .map((country: any) => ({
          name: country.name.common,
          code: country.cca2,
          flag: country.flag
        }))
        .sort((a: Country, b: Country) => a.name.localeCompare(b.name));

      // Cache the result
      countriesCache = countries;
      return countries;
    } catch (error) {
      console.error('Failed to fetch countries:', error);
      
      // Fallback countries if API fails
      const fallback = [
        { name: 'Kenya', code: 'KE', flag: '🇰🇪' },
        { name: 'Nigeria', code: 'NG', flag: '🇳🇬' },
        { name: 'South Africa', code: 'ZA', flag: '🇿🇦' },
        { name: 'Uganda', code: 'UG', flag: '🇺🇬' },
        { name: 'Tanzania', code: 'TZ', flag: '🇹🇿' },
        { name: 'Ghana', code: 'GH', flag: '🇬🇭' },
      ];
      
      countriesCache = fallback;
      return fallback;
    }
  },
};