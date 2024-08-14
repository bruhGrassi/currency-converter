import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CurrencyInput from './CurrencyInput';

const mockOnAmountChange = vi.fn();
const mockOnCurrencyChange = vi.fn();

describe('<CurrencyInput />', () => {
  it('renders the CurrencyInput component', () => {
    render(
      <CurrencyInput
        amount="100"
        currency="USD"
        onAmountChange={mockOnAmountChange}
        onCurrencyChange={mockOnCurrencyChange}
      />
    );

    expect(screen.getByText(/Dólar Americano/i)).toBeInTheDocument();
  });

  it('should call onAmountChange when the amount input changes', () => {
    render(
      <CurrencyInput
        amount="100"
        currency="USD"
        onAmountChange={mockOnAmountChange}
        onCurrencyChange={mockOnCurrencyChange}
      />
    );

    fireEvent.change(screen.getByDisplayValue('100'), {
      target: { value: '200' },
    });
    expect(mockOnAmountChange).toHaveBeenCalledWith('200');
  });
});
