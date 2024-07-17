import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import { server } from '@mocks';
import { http, HttpResponse } from 'msw';
import { JSX } from 'react';
import { RootState } from '@store/store';
import { userEvent } from '@testing-library/user-event';
import { renderWithProviders } from '@features/utils';
import { GameTabs } from '@features/games/components';

const API_URL = 'http://localhost:8080/api';

vi.stubEnv('VITE_API_URL', API_URL);

const setup = (
  component: JSX.Element,
  preloadedState?: Partial<RootState>
) => ({
  user: userEvent.setup(),
  ...renderWithProviders(component, { preloadedState }),
});

vi.mock('@features/docker-compose/components', () => ({
  PostgreSqlDockerComposeConfig: ({
    gameId,
    gameName,
  }: {
    gameId: string;
    gameName: string;
  }) => <div data-testid={`config-${gameId}`}>{gameName}</div>,
}));

describe('GameTabs', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it('should display progress bar', () => {
    server.use(
      http.get(`${API_URL}/v1/games`, () =>
        HttpResponse.json([{ id: 'game1', name: 'game 1' }])
      )
    );

    const { getByRole } = setup(<GameTabs />);

    expect(getByRole('progressbar')).toBeDefined();
  });

  it('should display progress bar', () => {
    server.use(
      http.get(`${API_URL}/v1/games`, () =>
        HttpResponse.json([{ id: 'game1', name: 'game 1' }])
      )
    );

    const { getByRole } = setup(<GameTabs />);

    expect(getByRole('progressbar')).toBeDefined();
  });

  it ('should display game tabs', async () => {

  })
});
