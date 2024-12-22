import { configureStore } from '@reduxjs/toolkit';
import configuratorReducer from './slices/configuratorSlice';

const store = configureStore({
	reducer: {
		configurator: configuratorReducer,
	},
});

export default store;
