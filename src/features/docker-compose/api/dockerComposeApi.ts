import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  DockerComposeFileConfig,
  PostgreSqlDockerComposeQueryArgs,
} from '@features/docker-compose/types';

export const dockerComposeApi = createApi({
  reducerPath: 'dockerComposeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  tagTypes: ['DockerCompose'],
  endpoints: (builder) => ({
    savePostgreSqlDockerCompose: builder.mutation<
      void,
      PostgreSqlDockerComposeQueryArgs
    >({
      query: ({ gameId, request }) => ({
        url: `/v1/docker-compose/${gameId}`,
        method: 'POST',
        body: request,
      }),
      invalidatesTags: (_result, _error, args) => [
        { type: 'DockerCompose', id: args.gameId },
      ],
    }),
    getDockerComposeConfig: builder.query<DockerComposeFileConfig, string>({
      query: (gameId) => `/v1/docker-compose/${gameId}`,
      providesTags: (_result, _error, id) => [
        {
          type: 'DockerCompose',
          id,
        },
      ],
    }),
    deleteDockerCompose: builder.mutation<void, string>({
      query: (gameId) => ({
        url: `/v1/docker-compose/${gameId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => {
        console.log('id', id);
        return [{ type: 'DockerCompose', id }];
      },
    }),
  }),
});

export const {
  useGetDockerComposeConfigQuery,
  useSavePostgreSqlDockerComposeMutation,
  useDeleteDockerComposeMutation,
} = dockerComposeApi;
