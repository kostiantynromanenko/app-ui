import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CreateGameRequest, Game } from '@features/games/types';

export const gameApi = createApi({
  reducerPath: 'gameApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  tagTypes: ['Games'],
  endpoints: (builder) => ({
    getGameById: builder.query<Game, string>({
      query: (id) => `/v1/games/${id}`,
    }),
    getAllGames: builder.query<Game[], void>({
      query: () => '/v1/games',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Games', id }) as const),
              { type: 'Games', id: 'LIST' },
            ]
          : [{ type: 'Games', id: 'LIST' }],
    }),
    createGame: builder.mutation<Game, CreateGameRequest>({
      query: (game) => ({
        url: '/v1/games',
        method: 'POST',
        body: game,
      }),
      invalidatesTags: [{ type: 'Games', id: 'LIST' }],
    }),
  }),
});

export const { useGetAllGamesQuery, useCreateGameMutation } = gameApi;
