import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PostgreSqlConfigMissingAlert } from '../alerts/PostgreSqlConfigMissingAlert';

describe('PostgreSqlConfigMissingAlert', () => {
  it('should render', () => {
    render(<PostgreSqlConfigMissingAlert />);

    expect(
      screen.findByText(
        'PostgreSQL configuration is missing. It will be created after you submit the form'
      )
    ).toBeDefined();
  });
});
