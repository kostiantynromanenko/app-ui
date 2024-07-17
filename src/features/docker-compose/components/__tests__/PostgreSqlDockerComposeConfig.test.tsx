import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import { JSX } from 'react';
import { RootState } from '@store/store.ts';
import { userEvent } from '@testing-library/user-event';
import { renderWithProviders } from '@features/utils';
import { PostgreSqlDockerComposeConfig } from '../PostgreSqlDockerComposeConfig';
import { server } from '@mocks';
import { http, HttpResponse } from 'msw';
import { waitFor } from '@testing-library/dom';

const API_URL = 'http://localhost:8080/api';

vi.stubEnv('VITE_API_URL', API_URL);

vi.mock('@features/docker-compose/components', () => ({
  PostgreSqlDockerComposeForm: () => <div data-testid="form" />,
}));

const setup = (
  component: JSX.Element,
  preloadedState?: Partial<RootState>
) => ({
  user: userEvent.setup(),
  ...renderWithProviders(component, { preloadedState }),
});

describe('PostgreSqlDockerComposeConfig', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it('should render loading indicator', () => {
    server.use(
      http.get(`${API_URL}/v1/docker-compose/game1`, () => HttpResponse.json())
    );

    const { getByRole } = setup(
      <PostgreSqlDockerComposeConfig gameId="game1" gameName="game 1" />
    );

    expect(getByRole('progressbar')).toBeDefined();
  });

  it('should render error alert when unexpected error occurs', async () => {
    server.use(
      http.get(
        `${API_URL}/v1/docker-compose/game1`,
        () =>
          new HttpResponse(null, {
            status: 500,
          })
      )
    );

    const { getByText } = setup(
      <PostgreSqlDockerComposeConfig gameId="game1" gameName="game 1" />
    );

    await waitFor(() => {
      expect(
        getByText(/Failed to fetch docker compose file config/)
      ).toBeDefined();
    });
  });

  it('should render alert when postgreSqlConfig is missing', async () => {
    server.use(
      http.get(`${API_URL}/v1/docker-compose/game1`, () => HttpResponse.json())
    );

    const { getByText } = setup(
      <PostgreSqlDockerComposeConfig gameId="game1" gameName="game 1" />
    );

    await waitFor(() => {
      expect(getByText(/no PostgreSql service found/)).toBeDefined();
    });
  });

  it('should render form when postgreSqlConfig is present', async () => {
    server.use(
      http.get(`${API_URL}/v1/docker-compose/game1`, () =>
        HttpResponse.json({
          services: {
            postgresql: {},
          },
        })
      )
    );

    const { getByTestId } = setup(
      <PostgreSqlDockerComposeConfig gameId="game1" gameName="game 1" />
    );

    await waitFor(() => {
      expect(getByTestId('form')).toBeDefined();
    });
  });

  it('should render alert when docker compose file is missing', async () => {
    server.use(
      http.get(
        `${API_URL}/v1/docker-compose/game1`,
        () => new HttpResponse(null, { status: 404 })
      )
    );

    const { getByText } = setup(
      <PostgreSqlDockerComposeConfig gameId="game1" gameName="game 1" />
    );

    await waitFor(() => {
      expect(getByText(/Docker compose file is missing/)).toBeDefined();
    });
  });
});
