import {useState} from "react";
import {useSelector} from "react-redux";
import {useGetListPatientQuery} from "../../redux/api/doctorApi";

import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import RemedyModal from "./RemedyModal";
import useToggle from "../../hooks/useToggle";

const ManagePatient = () => {
	const [startDate, setStartDate] = useState(new Date());
	const [patient, setPatient] = useState(null);
	// @ts-ignore
	const doctor = useSelector((state) => state.reducer.user.userInfo);

	const {data} = useGetListPatientQuery(
		{doctorId: doctor?.id, date: moment(startDate).format("DD/MM/YYYY")},
		{
			skip: !doctor?.id,
		}
	);
	const handleClinkButton = (item) => {
		toggleHandler();
		setPatient(item);
	};
	const {toggle, toggleHandler} = useToggle();
	return (
		<div>
			<h2 className="text-center pb-5">Quản lý bệnh nhân khám bệnh </h2>
			<div className="pb-5">
				<label htmlFor="" className="text-sm font-medium pb-2">
					Chọn ngày khám bệnh
				</label>
				<ReactDatePicker
					className="boder border-slate-300 rounded-md "
					selected={startDate}
					onChange={(date) => setStartDate(date)}
				/>
			</div>
			<div className="relative overflow-x-auto">
				<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th scope="col" className="px-6 py-3">
								STT
							</th>
							<th scope="col" className="px-6 py-3">
								Thời gian
							</th>
							<th scope="col" className="px-6 py-3">
								Họ và Tên
							</th>
							<th scope="col" className="px-6 py-3">
								Địa chỉ
							</th>
							<th scope="col" className="px-6 py-3">
								Giới tính
							</th>
							<th scope="col" className="px-6 py-3">
								Actions
							</th>
						</tr>
					</thead>
					<tbody>
						{data?.map((item, index) => (
							<tr
								key={index}
								className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
							>
								<td scope="row" className="px-6 py-4">
									{index + 1}
								</td>
								<td className="px-6 py-4">
									{item?.timeTypeBookingData?.valueVi}
								</td>
								<td className="px-6 py-4">{item?.patientData?.firstName}</td>
								<td className="px-6 py-4">{item?.patientData?.address}</td>
								<td className="px-6 py-4">
									{item?.patientData?.genderData?.valueVi}
								</td>
								<td className="px-6 py-4 flex gap-2">
									<button
										onClick={() => handleClinkButton(item)}
										className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-700"
									>
										Xác nhận
									</button>
									<button className="px-2 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-700">
										Gửi hóa đơn
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{toggle && (
				<RemedyModal
					patient={patient}
					toggle={toggle}
					toggleHandler={toggleHandler}
				/>
			)}
		</div>
	);
};

export default ManagePatient;
