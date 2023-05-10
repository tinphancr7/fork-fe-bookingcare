import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

// @ts-ignore
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const doctorApi = createApi({
	reducerPath: "doctorApi",
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
	tagTypes: ["Doctor"],
	endpoints: (build) => ({
		getDoctors: build.query({
			query: () => ({
				url: "doctors",
				method: "GET",
			}),
			providesTags(result) {
				if (result) {
					return [
						...result.map(({id}) => ({type: "Doctor", id})),
						{type: "Doctor", id: "LIST"},
					];
				}
				return [{type: "Doctor", id: "LIST"}];
			},
		}),
		getTopDoctors: build.query({
			query: () => ({
				url: "doctors/top-doctor",
				method: "GET",
			}),
			providesTags(result) {
				if (result) {
					return [
						...result.map(({id}) => ({type: "Doctor", id})),
						{type: "Doctor", id: "LIST"},
					];
				}
				return [{type: "Doctor", id: "LIST"}];
			},
		}),
		getDetailDoctorById: build.query({
			query: (id) => ({
				url: `doctors/get-detail-doctor-by-id/${id}`,
				method: "GET",
			}),
		}),
		getExtraInfoDoctorById: build.query({
			query: (id) => ({
				url: `doctors/get-extra-info-doctor-by-id/${id}`,
				method: "GET",
			}),
		}),
		getListPatient: build.query({
			query: (data) => ({
				url: `doctors/get-list-patient?doctorId=${data?.doctorId}&date=${data?.date}`,
				method: "GET",
			}),
			providesTags: ["Doctor"],
		}),
		getScheduleDoctorByDate: build.query({
			query: (data) => ({
				url: `doctors/get-schedule-doctor-by-date?doctorId=${data.doctorId}&date=${data.date}`,
				method: "GET",
			}),
		}),
		createBulkScheduleDoctor: build.mutation({
			query: (body) => ({
				url: "doctors/bulk-create-schedule-doctor",
				method: "POST",
				body,
			}),
		}),
		addInfoDoctor: build.mutation({
			query: (body) => ({
				url: "doctors/save-info-doctors",
				method: "POST",
				body,
			}),
			// @ts-ignore
			invalidatesTags: (result, error, arg) => [{type: "Doctor", id: "LIST"}],
		}),
		sendRemedy: build.mutation({
			query: (body) => ({
				url: "doctors/send-remedy",
				method: "POST",
				body,
			}),
			// @ts-ignore
			invalidatesTags: (result, error, arg) => ["Doctor"],
		}),
	}),
});

// export react hook
export const {
	useGetDoctorsQuery,
	useGetTopDoctorsQuery,
	useAddInfoDoctorMutation,
	useGetDetailDoctorByIdQuery,
	useCreateBulkScheduleDoctorMutation,
	useGetScheduleDoctorByDateQuery,
	useGetExtraInfoDoctorByIdQuery,
	useGetListPatientQuery,
	useSendRemedyMutation,
} = doctorApi;
