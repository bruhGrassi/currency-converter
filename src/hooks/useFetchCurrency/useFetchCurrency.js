import debounce from 'lodash.debounce';
import { useState, useEffect, useRef } from 'react';
import { buildApiUrl } from '@/lib/buildApiUrl';
import { mapCurrencyData } from '@/lib/mappers';

const useFetchCurrency = (baseCurrency, targetCurrency) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cache = useRef({});

  useEffect(() => {
    const fetchCurrencyData = async () => {
      setLoading(true);
      setError(null);

      const url = buildApiUrl(baseCurrency, targetCurrency, 30);

      if (cache.current[url]) {
        setData(cache.current[url]);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Erro ao buscar os dados');
        }
        const result = await response.json();
        const mappedData = mapCurrencyData(result);

        cache.current[url] = mappedData;
        setData(mappedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const debouncedFetch = debounce(fetchCurrencyData, 300);

    debouncedFetch();

    return () => {
      debouncedFetch.cancel();
    };
  }, [baseCurrency, targetCurrency]);

  return { data, loading, error };
};

export default useFetchCurrency;
