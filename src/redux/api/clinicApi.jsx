import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

// @ts-ignore
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const clinicApi = createApi({
	reducerPath: "clinicApi",
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
		getClinic: build.query({
			query: () => ({
				url: "clinics",
				method: "GET",
			}),
		}),
		getClinicById: build.query({
			query: (data) => ({
				url: `clinics/get-detail-clinic-by-id?id=${data?.id}&location=${data?.location}`,
				method: "GET",
			}),
		}),
		createClinic: build.mutation({
			query: (body) => ({
				url: "clinics",
				method: "POST",
				body,
			}),
		}),
	}),
});

// export react hook
export const {
	useCreateClinicMutation,
	useGetClinicQuery,
	useGetClinicByIdQuery,
} = clinicApi;
