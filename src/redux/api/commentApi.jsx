import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

// @ts-ignore
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const commentApi = createApi({
	reducerPath: "commentApi",
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
	tagTypes: ["Comment"],
	endpoints: (build) => ({
		getComments: build.query({
			query: () => ({
				url: "comments",
				method: "GET",
			}),
			providesTags(result) {
				if (result) {
					return [
						...result.map(({id}) => ({type: "Comment", id})),
						{type: "Comment", id: "LIST"},
					];
				}
				return [{type: "Comment", id: "LIST"}];
			},
		}),
		getCommentById: build.query({
			query: (data) => ({
				url: `comments/get-detail-comment-by-id?id=${data?.id}&location=${data?.location}`,
				method: "GET",
			}),
		}),
		createComment: build.mutation({
			query: (body) => ({
				url: "comments",
				method: "POST",
				body,
			}),
			// @ts-ignore
			invalidatesTags: (result, error, arg) => [{type: "Comment", id: "LIST"}],
		}),
		deleteComment: build.mutation({
			query: (id) => ({
				url: `comments/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: (result, error, data) => [
				{type: "Comment", id: data?.id},
			],
		}),
		updateComment: build.mutation({
			query: (data) => ({
				url: `comments/${data?.id}`,
				method: "PUT",
				body: data,
			}),
			invalidatesTags: (result, error, data) => [
				{type: "Comment", id: data?.id},
			],
		}),
	}),
});

// export react hook
export const {
	useCreateCommentMutation,
	useGetCommentsQuery,
	useGetCommentByIdQuery,
	useDeleteCommentMutation,
	useUpdateCommentMutation,
} = commentApi;
