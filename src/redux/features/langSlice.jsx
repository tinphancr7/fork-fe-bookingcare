import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	lang: localStorage.getItem("language") || "vi",
};

const langSlice = createSlice({
	name: "lang",
	initialState,
	reducers: {
		setLang: (state, action) => {
			state.lang = action.payload;
		},
	},
});

export const {setLang} = langSlice.actions;

export default langSlice.reducer;
