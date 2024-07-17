import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { gameApi } from '@features/games/api';
import { dockerComposeApi } from '@features/docker-compose/api';
import { notificationSliceReducer } from '@features/notifications/state';

const rootReducer = combineReducers({
  notification: notificationSliceReducer,
  [gameApi.reducerPath]: gameApi.reducer,
  [dockerComposeApi.reducerPath]: dockerComposeApi.reducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(gameApi.middleware)
        .concat(dockerComposeApi.middleware),
  });
};

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof setupStore>;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
