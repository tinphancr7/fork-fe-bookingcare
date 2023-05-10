import {createSlice} from "@reduxjs/toolkit";

const commentsSlice = createSlice({
	name: "comments",
	initialState: {
		commentsByParentId: [],
		isReplying: false,
		commentId: null,
		commentDeleteId: null,
	},
	reducers: {
		groupCommentsByParentId: (state, action) => {
			state.commentsByParentId = action.payload?.reduce((group, comment) => {
				if (!group[comment.parentId]) {
					group[comment.parentId] = [];
				}
				group[comment.parentId].push(comment);
				return group;
			}, {});
		},
		setReplying: (state, action) => {
			state.isReplying = action.payload.reply;
			state.commentId = action.payload.commentId;
		},
		setDeleteComment: (state, action) => {
			state.commentDeleteId = action.payload;
		},
	},
});

export const {groupCommentsByParentId, setReplying, setDeleteComment} =
	commentsSlice.actions;

export default commentsSlice.reducer;
