import React, {useState} from "react";
import {useParams} from "react-router-dom";
import "react-quill/dist/quill.bubble.css";
import {
	useGetDetailDoctorByIdQuery,
	useGetExtraInfoDoctorByIdQuery,
} from "../../redux/api/doctorApi";
import {handleParseBufferImage} from "../../utils/helpers";
import ScheduleDoctor from "./ScheduleDoctor";
import DoctorExtraInfo from "./DoctorExtraInfo";
import {useDispatch, useSelector} from "react-redux";
import ProfileDoctor from "./ProfileDoctor";
import CommentList from "../../components/comment/CommentList";
import {useGetCommentsQuery} from "../../redux/api/commentApi";
import CommentForm from "../../components/comment/CommentForm";

import {useEffect} from "react";
import {groupCommentsByParentId} from "../../redux/features/commentSlice";
import Spinner from "../../components/spin/Spinner";

const DetailDoctor = () => {
	const {id} = useParams();
	const dispatch = useDispatch();
	// @ts-ignore
	const {data: detailDoctor} = useGetDetailDoctorByIdQuery(id);
	const [rootComments, setRootComments] = useState([]);
	const {data: comments} = useGetCommentsQuery();

	// @ts-ignore
	const groupComment = useSelector(
		// @ts-ignore
		(state) => state.reducer.comment.commentsByParentId
	);

	useEffect(() => {
		if (groupComment) {
			setRootComments(groupComment[null]);
		}
	}, [groupComment]);

	useEffect(() => {
		dispatch(groupCommentsByParentId(comments));
	}, [comments]);

	return (
		<div className="">
			<div className="max-w-[1170px] w-full mx-auto py-4">
				<ProfileDoctor doctorId={id} isShow={true} />
				<div className="grid grid-cols-7 gap-4 ">
					<div className="border-r col-span-4 border-slate-300">
						<ScheduleDoctor doctorId={id} />
					</div>
					<div className="col-span-3">
						<DoctorExtraInfo doctorId={id} />
					</div>
				</div>
			</div>
			<div className="bg-bgPrimary p-5 border border-t-2 border-gray-200">
				<div
					className="max-w-[1170px] w-full mx-auto p2-4 detail-doctor"
					dangerouslySetInnerHTML={{
						__html: detailDoctor?.Markdown?.contentHTML,
					}}
				></div>
			</div>

			{/* <div className="wrapper">
				<CommentForm parentId="" title="bình luận" />
				<CommentList comments={rootComments} />
			</div> */}
		</div>
	);
};

export default DetailDoctor;
