import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CustomButton from './CustomButton';

describe('<CustomButton />', () => {
  it('renders with icon when icon prop is true', () => {
    const { container } = render(<CustomButton icon={true} />);
    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
  });

  it('renders with text when text prop is provided', () => {
    render(<CustomButton text="Button text" />);
    expect(screen.getByText(/Button text/i)).toBeInTheDocument();
  });

  it('does not apply active class when isActive is false', () => {
    render(<CustomButton isActive={false} />);

    expect(screen.getByRole('button')).toHaveClass('bg-transparent');
  });

  it('calls onClick function when button is clicked', () => {
    const handleClick = vi.fn();
    render(<CustomButton onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });
});
