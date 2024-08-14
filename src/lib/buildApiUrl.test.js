import { describe, it, expect } from 'vitest';
import { buildApiUrl } from './buildApiUrl';
import { API, API_KEY } from '../../constants';

describe('buildApiUrl', () => {
  it('should generate the correct URL', () => {
    const baseCurrency = 'USD';
    const targetCurrency = 'EUR';
    const period = 30;
    const fixedEndDate = '2024-08-14';
    const fixedStartDate = '2024-07-15';

    const expectedUrl = `${API}${API_KEY}&base=${baseCurrency}&start_date=${fixedStartDate}&end_date=${fixedEndDate}&symbols=${targetCurrency}`;
    expect(
      buildApiUrl(
        baseCurrency,
        targetCurrency,
        period,
        fixedStartDate,
        fixedEndDate
      )
    ).toBe(expectedUrl);
  });
});
