import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

// @ts-ignore
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const handbookApi = createApi({
	reducerPath: "handbookApi",
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
		getAllHandBook: build.query({
			query: () => ({
				url: "handbooks",
				method: "GET",
			}),
		}),
		getHandBookById: build.query({
			query: (id) => ({
				url: `handbooks/get-detail-handbook-by-id/${id}`,
				method: "GET",
			}),
		}),
		createHandBook: build.mutation({
			query: (body) => ({
				url: "handbooks",
				method: "POST",
				body,
			}),
		}),
	}),
});

// export react hook
export const {
	useCreateHandBookMutation,
	useGetHandBookByIdQuery,
	useGetAllHandBookQuery,
} = handbookApi;
