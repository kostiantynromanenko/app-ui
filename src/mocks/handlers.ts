import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('http://localhost:8080/api/v1/docker-compose/game1', () =>
    HttpResponse.json()
  ),
];
