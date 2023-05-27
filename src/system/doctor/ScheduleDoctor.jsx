import React, {useEffect, useState} from "react";
import moment from "moment";
import "moment/dist/locale/vi"; // without this line it didn't work
import {useParams} from "react-router-dom";
import {useGetScheduleDoctorByDateQuery} from "../../redux/api/doctorApi";
import {AiFillCalendar} from "react-icons/ai";
import {firstLetterUpperCase} from "../../utils/helpers";
import {useDispatch, useSelector} from "react-redux";
import {FaHandPointUp} from "react-icons/fa";
import {useTranslation} from "react-i18next";
import BookingModal from "./BookingModal";
import useToggle from "../../hooks/useToggle";
import {setBookingInfo} from "../../redux/features/bookingSlice";
const ScheduleDoctor = ({doctorId}) => {
	const dispatch = useDispatch();
	// @ts-ignore
	const lang = useSelector((state) => state.reducer.lang.lang);
	const {t} = useTranslation();

	const [date, setDate] = useState(moment(new Date()).format("DD/MM/YYYY"));
	const {data} = useGetScheduleDoctorByDateQuery({
		date: date,
		doctorId: doctorId,
	});

	let arrDate = [];
	for (let i = 0; i < 7; i++) {
		let obj = {};
		if (lang === "vi") {
			if (i === 0) {
				let labelVi2 = moment(new Date()).format("DD/MM");
				let today = `Hôm nay - ${labelVi2}`;
				obj.label = firstLetterUpperCase(today);
			} else {
				let labelVi = moment(new Date()).add(i, "days").format("dddd - DD/MM");
				obj.label = firstLetterUpperCase(labelVi);
			}
		} else {
			if (i === 0) {
				let labelVi2 = moment(new Date()).locale("en").format("DD/MM");
				let today = `Today - ${labelVi2}`;
				obj.label = today;
			} else {
				obj.label = moment(new Date())
					.add(i, "days")
					.locale("en")
					.format("ddd - DD/MM");
			}
		}

		obj.value = moment(new Date()).add(i, "days").format("DD/MM/YYYY");
		arrDate.push(obj);
	}
	const handleChangeDate = (e) => {
		setDate(e.target.value);
	};
	const handleClickSchedule = (item) => {
		dispatch(setBookingInfo(item));
		toggleHandler();
	};

	// @ts-ignore
	const {toggle, toggleHandler} = useToggle();
	return (
		<>
			<div>
				<select
					id="underline_select"
					className="block py-1 px-0  text-base  text-blue-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer "
					onChange={handleChangeDate}
				>
					{arrDate.map((item, index) => {
						return (
							<option key={index} value={item.value}>
								{item.label}
							</option>
						);
					})}
				</select>
				<p className="flex items-center gap-2 pt-5">
					<AiFillCalendar />
					<span className="text-sm font-bold uppercase">
						{t("patient.detail-doctor.schedule")}
					</span>
				</p>
				<div className="flex mt-2 flex-wrap">
					{data?.length > 0 ? (
						data?.map((item, index) => {
							let time =
								lang === "vi"
									? item.timeTypeData.valueVi
									: item.timeTypeData.valueEn;
							return (
								<button
									onClick={() => handleClickSchedule(item)}
									key={index}
									type="button"
									className={`text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 w-full ${
										lang === "vi" ? "max-w-[150px]" : "max-w-[180px]"
									}`}
								>
									{time}
								</button>
							);
						})
					) : (
						<p>
							<span className="text-red-500">
								{t("patient.detail-doctor.no-schedule")}
							</span>
						</p>
					)}
				</div>
				{data?.length > 0 && (
					<p className="text-sm font-light flex gap-1 pt-2">
						{t("patient.detail-doctor.choose")}
						<span>
							<FaHandPointUp />
						</span>{" "}
						{t("patient.detail-doctor.book-free")}
					</p>
				)}
			</div>

			{toggle && <BookingModal toggleHandler={toggleHandler} />}
		</>
	);
};

export default ScheduleDoctor;
