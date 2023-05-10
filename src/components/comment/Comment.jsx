import React, {useEffect, useState} from "react";
import {handleParseBufferImage} from "../../utils/helpers";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";
import {setDeleteComment, setReplying} from "../../redux/features/commentSlice";
import {useUpdateCommentMutation} from "../../redux/api/commentApi";
import DeleteModal from "../modal/DeleteModal";
import useToggle from "../../hooks/useToggle";
import TextareaAutosize from "react-textarea-autosize";
const Comment = ({comment}) => {
	const dispatch = useDispatch();
	const [childComments, setChildComments] = useState([]);
	const parent = useSelector(
		// @ts-ignore
		(state) => state.reducer.comment.commentsByParentId
	);
	// @ts-ignore
	const result = useSelector((state) => state.reducer.comment);
	// @ts-ignore
	const userInfo = useSelector((state) => state.reducer.user.userInfo);

	const {toggle, toggleHandler} = useToggle();
	const handleDeleteComment = (id) => {
		toggleHandler();
		dispatch(setDeleteComment(id));
	};

	const [isEdit, setIsEdit] = useState(false);
	const [text, setText] = useState(comment?.message || "");
	const handleChange = (event) => {
		setText(event.target.value);
	};
	const [updateComment, {isSuccess}] = useUpdateCommentMutation();

	useEffect(() => {
		if (parent) {
			setChildComments(parent[comment?.id]);
		}
	}, [parent]);

	useEffect(() => {
		if (isSuccess) {
			setTimeout(() => {
				setIsEdit(false);
			}, 1000);
		}
	}, [isSuccess]);

	return (
		<>
			<div className="mt-2" key={comment?.id}>
				<div className="flex gap-2 ">
					<div className="comment-user-avatar relative ">
						<img
							src={
								comment?.userData &&
								handleParseBufferImage(comment?.userData?.image)
							}
							className="w-[40px] h-[40px] object-cover rounded-full"
							alt="avatar"
						/>
					</div>
					<div>
						{!isEdit && (
							<div className="flex gap-2 items-center">
								<span className="text-sm font-medium capitalize">{`${comment?.userData?.lastName} ${comment?.userData?.firstName}`}</span>
								<span className="text-xs ">
									{moment(comment?.createdAt).fromNow()}
								</span>
							</div>
						)}
						<div>
							<div className="comment-content">
								{isEdit ? (
									<div>
										<TextareaAutosize
											onChange={handleChange}
											value={text}
											className="w-[500px] border-b border-slate-300 border-t-0 border-x-0 resize-none  focus:border-b-2 focus:border-slate-300 focus:ring-0  overflow-hidden"
											placeholder="Write a comment..."
										/>
										<div className="flex gap-2 justify-end">
											<button
												className="rounded-full text-sm hover:bg-gray-200 font-medium  py-2 px-4"
												onClick={() => setIsEdit(false)}
											>
												Hủy
											</button>
											<button
												type="button"
												className={`rounded-full text-sm capitalize font-medium  py-2 px-4 ${
													text.length > 0
														? "bg-blue-500 text-white"
														: "bg-gray-200 text-gray-500"
												}`}
												onClick={() => {
													updateComment({
														id: comment.id,
														message: text,
													});
												}}
											>
												Lưu
											</button>
										</div>
									</div>
								) : (
									comment?.message
								)}
							</div>
							{!isEdit && (
								<div className="flex gap-2">
									<button
										className="text-xs font-medium"
										onClick={() =>
											dispatch(
												setReplying({reply: true, commentId: comment.id})
											)
										}
									>
										Reply
									</button>
									{userInfo?.id === comment?.userId && (
										<>
											<button
												className="text-xs font-medium"
												onClick={() => setIsEdit(true)}
											>
												Edit
											</button>
											<button
												className="text-xs font-medium"
												onClick={() => handleDeleteComment(comment.id)}
											>
												Delete
											</button>
										</>
									)}
								</div>
							)}
							{result?.isReplying && result?.commentId == comment.id && (
								<CommentForm parentId={comment.id} title="Phản Hồi" />
							)}
						</div>
					</div>
				</div>
			</div>
			{childComments?.length > 0 && (
				<div className="ml-5 pl-5 relative before:absolute  before:w-[1px]  before:bg-gray-300  before:h-[40px] before:-top-5 before:left-0 ">
					<CommentList comments={childComments} />
				</div>
			)}
			{toggle && <DeleteModal toggleHandler={toggleHandler} />}
		</>
	);
};

export default Comment;
