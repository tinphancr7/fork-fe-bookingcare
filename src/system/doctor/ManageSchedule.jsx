import React, {useEffect, useMemo, useState} from "react";
import "react-datepicker/dist/react-datepicker.css";
import {useGetAllCodeServiceQuery} from "../../redux/api/userApi";
import {
	useCreateBulkScheduleDoctorMutation,
	useGetDoctorsQuery,
} from "../../redux/api/doctorApi";
import {Formik} from "formik";
import {scheduleSchema} from "../../utils/validate";
import Spinner from "../../components/spin/Spinner";
import CustomeDatePicker from "../../components/date/CustomeDatePicker";
import moment from "moment/moment";
import {toast} from "react-toastify";
import CustomSelect from "../../components/select/CustomSelect";

const ManageSchedule = () => {
	const {data: doctors} = useGetDoctorsQuery();
	const {data: schedule} = useGetAllCodeServiceQuery("time");
	const [createBulkScheduleDoctor, {isSuccess}] =
		useCreateBulkScheduleDoctorMutation();
	const [selectedOption, setSelectedOption] = useState([]);
	const handleSelectedOption = (time) => {
		if (!selectedOption.includes(time)) {
			setSelectedOption([...selectedOption, time]);
		} else {
			setSelectedOption(selectedOption.filter((item) => item !== time));
		}
	};
	useEffect(() => {
		if (isSuccess) {
			toast.success("Tạo lịch khám thành công");
		}
	}, [isSuccess]);

	const options = useMemo(
		() =>
			doctors?.map((doctor) => ({
				value: doctor.id,
				label: `${doctor.lastName} ${doctor.firstName}`,
			})),
		[doctors]
	);
	return (
		<div className="max-w-[1000px] w-full mx-auto">
			<h3 className="text-center pb-10">
				Quản lý kế hoạch khám bệnh của bác sĩ
			</h3>
			<Formik
				initialValues={{
					doctorId: "",
					date: new Date(),
				}}
				validationSchema={scheduleSchema}
				onSubmit={(values, {setSubmitting, resetForm}) => {
					setTimeout(() => {
						if (selectedOption.length === 0) {
							toast.error("Vui lòng chọn thời gian khám bệnh");
							setSubmitting(false);
							return;
						}
						let data = selectedOption.map((item) => {
							return {
								doctorId: values.doctorId,
								date: moment(values.date).format("DD/MM/YYYY"),
								timeType: item,
							};
						});
						createBulkScheduleDoctor({
							arrSchedule: data,
							doctorId: values.doctorId,
							date: moment(values.date).format("DD/MM/YYYY"),
						});
						resetForm();
						setSubmitting(false);
					}, 2000);
				}}
			>
				{(formik) => (
					<form
						onSubmit={formik.handleSubmit}
						className="space-y-4 md:space-y-6"
					>
						<div className="grid grid-cols-2 gap-5">
							<CustomSelect
								label="Chọn bác sĩ"
								name="doctorId"
								options={options}
							/>
							<CustomeDatePicker label="Chọn ngày" name="date" />
						</div>
						<div className="w-full h-[200px]  rounded-md border border-blue-500 mt-10 p-4">
							<div className="flex  gap-5 flex-wrap">
								{schedule?.map((item) => {
									return (
										<button
											onClick={() => handleSelectedOption(item.keyMap)}
											key={item.id}
											type="button"
											className={`${
												selectedOption.includes(item.keyMap)
													? "text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
													: "py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700"
											}`}
										>
											{item.valueVi}
										</button>
									);
								})}
							</div>
						</div>
						<button
							type="submit"
							className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
						>
							{formik.isSubmitting ? <Spinner /> : "Submit"}
						</button>
					</form>
				)}
			</Formik>
		</div>
	);
};

export default ManageSchedule;
