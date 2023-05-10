import Comment from "./Comment";

const CommentList = ({comments}) => {
	return (
		<div className="">
			{comments?.map((comment, index) => (
				<Comment key={index} comment={comment} />
			))}
		</div>
	);
};

export default CommentList;
