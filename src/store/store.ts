import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { gameApi } from '@features/games/api';
import { dockerComposeApi } from '@features/docker-compose/api';
import { notificationSliceReducer } from '@features/notifications/state';

export const store = configureStore({
  reducer: {
    notification: notificationSliceReducer,
    [gameApi.reducerPath]: gameApi.reducer,
    [dockerComposeApi.reducerPath]: dockerComposeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(gameApi.middleware)
      .concat(dockerComposeApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
