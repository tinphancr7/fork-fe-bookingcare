// app/store.js
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import userReducer from "./features/userSlice";
import doctorReducer from "./features/doctorSlice";
import commentReducer from "./features/commentSlice";
import langReducer from "./features/langSlice";
import bookingReducer from "./features/bookingSlice";
import {authApi} from "./api/authApi";
import storage from "redux-persist/lib/storage";
import {persistReducer, persistStore} from "redux-persist";
import {userApi} from "./api/userApi";
import thunk from "redux-thunk";
import {rtkQueryErrorLogger} from "../middleware";
import {doctorApi} from "./api/doctorApi";
import {specialtyApi} from "./api/specialtyApi";
import {clinicApi} from "./api/clinicApi";
import {handbookApi} from "./api/handbookApi";
import {commentApi} from "./api/commentApi";

const persistConfig = {
	key: "root",
	storage,
	// blacklist: ["user"],
	whitelist: ["user"],
};
const rootReducer = combineReducers({
	auth: authReducer,
	user: userReducer,
	doctor: doctorReducer,
	lang: langReducer,
	booking: bookingReducer,
	comment: commentReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: {
		reducer: persistedReducer,
		[authApi.reducerPath]: authApi.reducer,
		[userApi.reducerPath]: userApi.reducer,
		[doctorApi.reducerPath]: doctorApi.reducer,
		[specialtyApi.reducerPath]: specialtyApi.reducer,
		[clinicApi.reducerPath]: clinicApi.reducer,
		[handbookApi.reducerPath]: handbookApi.reducer,
		[commentApi.reducerPath]: commentApi.reducer,
	},
	devTools: process.env.NODE_ENV !== "production",

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			immutableCheck: false,
			serializableCheck: false,
		}).concat(
			thunk,
			authApi.middleware,
			userApi.middleware,
			doctorApi.middleware,
			specialtyApi.middleware,
			clinicApi.middleware,
			handbookApi.middleware,
			commentApi.middleware,
			rtkQueryErrorLogger
		),
});
export const persistor = persistStore(store);
