import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { UnexpectedErrorAlert } from '../alerts/UnexpectedErrorAlert';

describe('UnexpectedErrorAlert', () => {
  it('should render', () => {
    render(<UnexpectedErrorAlert />);

    expect(
      screen.findByText('An unexpected error occurred. Please try again later.')
    ).toBeDefined();
  });
});
