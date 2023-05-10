import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

// @ts-ignore
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const authApi = createApi({
	reducerPath: "authApi",
	baseQuery: fetchBaseQuery({
		baseUrl: `${BASE_URL}`,
		prepareHeaders: (headers, {getState}) => {
			// @ts-ignore
			const token = getState().reducer.auth.userToken;
			if (token) {
				headers.set("authorization", `Bearer ${token}`);
				return headers;
			}
		},
	}),
	endpoints: (build) => ({
		getDetails: build.query({
			query: () => ({
				url: "user/profile",
				method: "GET",
			}),
		}),
		loginUser: build.mutation({
			query: (body) => ({
				url: "auth/login",
				method: "POST",
				body,
			}),
		}),
	}),
});

// export react hook
export const {useGetDetailsQuery, useLoginUserMutation} = authApi;
