import {useMemo} from "react";
const useComment = (comments) => {
	const commentsByParentId = useMemo(() => {
		const group = {};
		comments?.forEach((comment) => {
			group[comment?.parentId] ||= [];
			group[comment?.parentId]?.push(comment);
		});
		return group;
	}, [comments]);

	const rootComments = useMemo(() => {
		return commentsByParentId[null];
	}, [comments]);
	const getReplies = (parentId) => {
		return commentsByParentId[parentId];
	};
	return {
		commentsByParentId,
		rootComments,
		getReplies,
	};
};
export default useComment;
