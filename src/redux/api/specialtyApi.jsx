import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

// @ts-ignore
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const specialtyApi = createApi({
	reducerPath: "specialtyApi",
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
		getAllSpecialty: build.query({
			query: (limit) => ({
				url: `specialties?limit=${limit}`,
				method: "GET",
			}),
		}),
		getSpecialtyById: build.query({
			query: (data) => ({
				url: `specialties/get-detail-specialty-by-id?id=${data?.id}&location=${data?.location}`,
				method: "GET",
			}),
		}),
		createSpcialty: build.mutation({
			query: (body) => ({
				url: "specialties",
				method: "POST",
				body,
			}),
		}),
	}),
});

// export react hook
export const {
	useCreateSpcialtyMutation,
	useGetAllSpecialtyQuery,
	useGetSpecialtyByIdQuery,
} = specialtyApi;
