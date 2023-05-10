import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	bookingInfo: null,
};

const bookingSlice = createSlice({
	name: "booking",
	initialState,
	reducers: {
		setBookingInfo: (state, action) => {
			state.bookingInfo = action.payload;
		},
	},
});

export const {setBookingInfo} = bookingSlice.actions;

export default bookingSlice.reducer;
