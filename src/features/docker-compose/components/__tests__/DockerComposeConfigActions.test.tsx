import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DockerComposeConfigActions } from '../DockerComposeConfigActions';
import { userEvent } from '@testing-library/user-event';

const setup = (component: JSX.Element) => ({
  user: userEvent.setup(),
  ...render(component),
});

const onDeleteMock = vi.fn();
const onDownloadMock = vi.fn();

describe('DockerComposeConfigActions', () => {
  it('should render', () => {
    setup(
      <DockerComposeConfigActions
        onDelete={onDeleteMock}
        onDownload={onDownloadMock}
      />
    );

    expect(screen.getByText('Delete')).toBeDefined();
    expect(screen.getByText('Download')).toBeDefined();
  });

  it('should call onDelete when delete button is clicked', async () => {
    const { getByText } = setup(
      <DockerComposeConfigActions
        onDelete={onDeleteMock}
        onDownload={onDownloadMock}
      />
    );

    await userEvent.click(getByText('Delete'));

    expect(onDeleteMock).toHaveBeenCalled();
  });

  it('should call onDownload when download button is clicked', async () => {
    const { getByText } = setup(
      <DockerComposeConfigActions
        onDelete={onDeleteMock}
        onDownload={onDownloadMock}
      />
    );

    await userEvent.click(getByText('Download'));

    expect(onDownloadMock).toHaveBeenCalled();
  });
});
