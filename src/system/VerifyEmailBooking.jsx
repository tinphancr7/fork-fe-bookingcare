import React, {useEffect} from "react";
import {useLocation} from "react-router-dom";
import {useVerifyBookingAppointmentMutation} from "../redux/api/userApi";
import {useSelector} from "react-redux";
import Spinner from "../components/spin/Spinner";

const VerifyEmailBooking = () => {
	const location = useLocation();
	const token = new URLSearchParams(location.search).get("token");
	const doctorId = new URLSearchParams(location.search).get("doctorId");
	// @ts-ignore
	const lang = useSelector((state) => state.reducer.lang.lang);
	const [verifyBookingAppointment, {isSuccess, data: res}] =
		useVerifyBookingAppointmentMutation();

	useEffect(() => {
		verifyBookingAppointment({
			token,
			doctorId,
		});
	}, [token, doctorId]);

	return (
		<div>
			{res?.message ? (
				!res?.error ? (
					<h2 className="text-green-500 text-center uppercase pt-10">
						{lang === "vi"
							? "Xác nhận email đặt lịch thành công"
							: "verify email booking suscessfully"}
					</h2>
				) : (
					<h2 className="text-red-500 text-center uppercase pt-10">
						{lang === "vi"
							? "Lịch hẹn không tồn tại hoặc đã được xác nhận"
							: res?.message}
					</h2>
				)
			) : (
				""
			)}
		</div>
	);
};

export default VerifyEmailBooking;
