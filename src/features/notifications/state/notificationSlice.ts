import { createSlice } from '@reduxjs/toolkit';
import { NotificationState } from '@features/notifications/types';

const initialState: NotificationState = {
  open: false,
  message: '',
  severity: 'warning',
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification: (state, action) => {
      state.open = true;
      state.message = action.payload.message;
      state.severity = action.payload.severity;
    },
    hideNotification: () => ({ ...initialState }),
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;

export const notificationSliceReducer = notificationSlice.reducer;
