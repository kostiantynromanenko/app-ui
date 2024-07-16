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
    getDockerComposeConfig: builder.query<DockerComposeFileConfig, string>({
      query: (gameId) => `/v1/docker-compose/${gameId}`,
      providesTags: (_result, _error, id) => [
        {
          type: 'DockerCompose',
          id,
        },
      ],
    }),
    createPostgreSqlDockerCompose: builder.mutation<
      void,
      PostgreSqlDockerComposeQueryArgs
    >({
      query: ({ id, request }) => ({
        url: `/v1/docker-compose/${id}/postgresql`,
        method: 'POST',
        body: request,
      }),
      invalidatesTags: (_result, _error, args) => [
        { type: 'DockerCompose', id: args.id },
      ],
    }),
  }),
});

export const {
  useGetDockerComposeConfigQuery,
  useCreatePostgreSqlDockerComposeMutation,
} = dockerComposeApi;
