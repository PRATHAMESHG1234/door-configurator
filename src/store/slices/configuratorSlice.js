import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	design: 'basic-door',
	color: 'white',
	handle: 'default-handle',
	glass: 'none',
};

const configuratorSlice = createSlice({
	name: 'configurator',
	initialState,
	reducers: {
		setDesign: (state, action) => {
			state.design = action.payload;
		},
		setColor: (state, action) => {
			state.color = action.payload;
		},
		setHandle: (state, action) => {
			state.handle = action.payload;
		},
		setGlass: (state, action) => {
			state.glass = action.payload;
		},
	},
});

export const { setDesign, setColor, setHandle, setGlass } =
	configuratorSlice.actions;
export default configuratorSlice.reducer;
