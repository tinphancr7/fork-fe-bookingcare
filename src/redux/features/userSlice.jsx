import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	userInfo: null,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		logout: () => initialState,
		setCredentials: (state, action) => {
			state.userInfo = action.payload;
		},
	},
});

export const {setCredentials, logout} = userSlice.actions;

export default userSlice.reducer;
