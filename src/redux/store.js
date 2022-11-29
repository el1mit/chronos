import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/authSlice';
import { calendarsReducer } from './slices/calendarSlice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		calendars: calendarsReducer
	}
});
