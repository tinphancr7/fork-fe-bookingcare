import {useEffect, useRef, useState} from "react";
import {useCreateCommentMutation} from "../../redux/api/commentApi";
import {toast} from "react-toastify";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import TextareaAutosize from "react-textarea-autosize";
import Spinner from "../spin/Spinner";
import {setReplying} from "../../redux/features/commentSlice";

const CommentForm = ({parentId, title}) => {
	const dispatch = useDispatch();
	const {id: doctorId} = useParams();
	// @ts-ignore
	const user = useSelector((state) => state.reducer.user.userInfo);

	const [createComment, {isSuccess, isLoading}] = useCreateCommentMutation();
	const [text, setText] = useState("");
	const handleChange = (event) => {
		setText(event.target.value);
	};

	const onSubmit = (event) => {
		event.preventDefault();
		createComment({
			doctorId,
			userId: user.id,
			message: text,
			parentId: parentId ? parentId : null,
		});
	};
	useEffect(() => {
		if (isSuccess) {
			setTimeout(() => {
				setText("");
				dispatch(setReplying({reply: false, id: null}));
			}, 500);
		}
	}, [isSuccess]);
	return (
		<form onSubmit={onSubmit} className="w-[500px]">
			<div>
				<TextareaAutosize
					onChange={handleChange}
					value={text}
					className="w-[500px] border-b border-slate-300 border-t-0 border-x-0 resize-none  focus:border-b-2 focus:border-slate-300 focus:ring-0  overflow-hidden"
					placeholder="Write a comment..."
				/>
			</div>

			<div className="flex gap-2 justify-end">
				<button
					onClick={() => {
						setText("");
						dispatch(setReplying({reply: false, id: null}));
					}}
					type="button"
					className="rounded-full text-sm hover:bg-gray-200 font-medium  py-2 px-4"
				>
					Hủy
				</button>
				<button
					type="submit"
					className={`rounded-full text-sm capitalize font-medium  py-2 px-4 ${
						text.length > 0
							? "bg-blue-500 text-white"
							: "bg-gray-200 text-gray-500"
					}`}
				>
					{title}
				</button>
			</div>
		</form>
	);
};

export default CommentForm;
