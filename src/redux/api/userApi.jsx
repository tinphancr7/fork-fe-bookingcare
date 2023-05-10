import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

// @ts-ignore
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const userApi = createApi({
	reducerPath: "userApi",
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
	tagTypes: ["User"],
	endpoints: (build) => ({
		getUsers: build.query({
			query: () => ({
				url: "users",
				method: "GET",
			}),
			providesTags(result) {
				if (result) {
					return [
						...result.map(({id}) => ({type: "User", id})),
						{type: "User", id: "LIST"},
					];
				}
				return [{type: "User", id: "LIST"}];
			},
		}),
		getAllCodeService: build.query({
			query: (type) => ({
				url: `allcodes?type=${type}`,
				method: "GET",
			}),
		}),

		createNewUser: build.mutation({
			query: (body) => ({
				url: "auth/register",
				method: "POST",
				body,
			}),
			// @ts-ignore
			invalidatesTags: (result, error, arg) => [{type: "User", id: "LIST"}],
		}),

		createBookingAppointment: build.mutation({
			query: (body) => ({
				url: "users/patient-book-appointment",
				method: "POST",
				body,
			}),
		}),
		verifyBookingAppointment: build.mutation({
			query: (body) => ({
				url: "users/verify-book-appointment",
				method: "POST",
				body,
			}),
		}),
	}),
});

// export react hook
export const {
	useGetUsersQuery,
	useCreateNewUserMutation,
	useGetAllCodeServiceQuery,
	useCreateBookingAppointmentMutation,
	useVerifyBookingAppointmentMutation,
} = userApi;
