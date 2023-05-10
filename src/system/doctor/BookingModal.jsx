import {useEffect, useMemo} from "react";
import useToggle from "../../hooks/useToggle";
import {useParams} from "react-router-dom";
import {useGetDetailDoctorByIdQuery} from "../../redux/api/doctorApi";
import {Formik} from "formik";
import MyTextInput from "../../components/input/MyTextInput";
import Spinner from "../../components/spin/Spinner";
import MyTextarea from "../../components/textarea/MyTextarea";
import ProfileDoctor from "./ProfileDoctor";
import {AiOutlineClose} from "react-icons/ai";
import {useSelector} from "react-redux";
import {
	useCreateBookingAppointmentMutation,
	useGetAllCodeServiceQuery,
} from "../../redux/api/userApi";
import {
	buildDoctorName,
	buildTimeBooking,
	getDataAllCode,
	infoPosFullName,
} from "../../utils/helpers";
import MySelect from "../../components/select/MySelect";
import CustomeDatePicker from "../../components/date/CustomeDatePicker";
import moment from "moment";
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";

const BookingModal = ({toggleHandler}) => {
	// @ts-ignore
	const lang = useSelector((state) => state.reducer.lang.lang);
	const {t} = useTranslation();

	const {id} = useParams();
	const {data: doctorInfo, isFetching} = useGetDetailDoctorByIdQuery(id);

	// @ts-ignore
	const bookingInfo = useSelector((state) => state.reducer.booking.bookingInfo);

	const {data: genders} = useGetAllCodeServiceQuery("gender");
	const optionsGender = useMemo(
		() => getDataAllCode(genders, lang),
		[genders, lang]
	);

	const [createBookingAppointment, {isSuccess}] =
		useCreateBookingAppointmentMutation();

	useEffect(() => {
		if (isSuccess) {
			toast.success("Đặt lịch thành công");
		}
	}, [isSuccess]);
	// @ts-ignore
	useEffect(() => {
		document.body.style.overflow = "hidden";
		return () => (document.body.style.overflow = "unset");
	}, []);
	return (
		<>
			<div
				className="relative z-10"
				aria-labelledby="modal-title"
				role="dialog"
				aria-modal="true"
			>
				<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

				<div className="fixed inset-0 z-10 overflow-y-auto">
					<div className="flex min-h-full  items-end justify-center p-4 text-center sm:items-center sm:p-0">
						<div className="relative  transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg  lg:max-w-2xl w-full">
							<div className="bg-white  px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
								<Formik
									initialValues={{
										fullName: "",
										phone: "",
										email: "",
										address: "",
										birthDay: "",
										gender: "",
										reason: "",
									}}
									// validationSchema={loginSchema}
									onSubmit={(values, {setSubmitting, resetForm}) => {
										setTimeout(() => {
											let birthDay =
												values.birthDay === ""
													? moment(new Date()).format("DD/MM/YYYY")
													: values.birthDay;
											createBookingAppointment({
												...values,
												doctorId: id,
												timeType: bookingInfo?.timeType,
												date: bookingInfo?.date,
												language: lang,
												timeString: buildTimeBooking(bookingInfo, lang),
												doctorName: infoPosFullName(doctorInfo, lang),
											});
											// resetForm();
											setSubmitting(false);
										}, 2000);
									}}
								>
									{(formik) => (
										<form
											onSubmit={formik.handleSubmit}
											className="space-y-4 md:space-y-4"
										>
											<div className="flex justify-between border-b border-slate-200 pb-2">
												<h3>{t("patient.booking-modal.title")}</h3>
												<span>
													<AiOutlineClose
														size={20}
														className="cursor-pointer"
														onClick={toggleHandler}
													/>
												</span>
											</div>
											<ProfileDoctor doctorId={id} />
											<div className="grid grid-cols-2 gap-5">
												<MyTextInput
													label={t("patient.booking-modal.fullName")}
													name="fullName"
													type="text"
												/>
												<MyTextInput label="phone" name="phone" type="number" />
												<MyTextInput label="Email" name="email" type="email" />
												<MyTextInput
													label={t("patient.booking-modal.address")}
													name="address"
													type="text"
												/>
												<CustomeDatePicker
													label={t("patient.booking-modal.birthDay")}
													name="birthDay"
												/>
												<MySelect
													label={t("patient.booking-modal.gender")}
													name="gender"
												>
													<option value="">Select menu</option>
													{optionsGender?.map((item) => (
														<option key={item.value} value={item.value}>
															{item.label}
														</option>
													))}
												</MySelect>
												<div className="col-span-2">
													<MyTextarea
														label={t("patient.booking-modal.reason")}
														name="reason"
													/>
												</div>
											</div>

											<div className=" border-t border-slate-200 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
												<button
													type="submit"
													className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
												>
													{formik.isSubmitting ? (
														<Spinner />
													) : (
														t("patient.booking-modal.confirm")
													)}
												</button>
												<button
													type="button"
													className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
													onClick={toggleHandler}
												>
													{t("patient.booking-modal.cancel")}
												</button>
											</div>
										</form>
									)}
								</Formik>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default BookingModal;
