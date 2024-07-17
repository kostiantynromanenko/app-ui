import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DockerComposeFileMissingAlert } from '../alerts/DockerComposeFileMissingAlert';

describe('DockerComposeFileMissingAlert', () => {
  it('should render', () => {
    render(<DockerComposeFileMissingAlert />);

    expect(
      screen.findByText(
        'Docker compose file is missing. It will be created after you submit the form'
      )
    ).toBeDefined();
  });
});
