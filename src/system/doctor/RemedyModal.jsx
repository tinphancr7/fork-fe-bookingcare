import {Formik} from "formik";
import React, {useEffect} from "react";
import {AiOutlineClose} from "react-icons/ai";
import MyTextInput from "../../components/input/MyTextInput";
import {useTranslation} from "react-i18next";
import Spinner from "../../components/spin/Spinner";
import MyFileInput from "../../components/input/MyFileInput";
import useFileImage from "../../hooks/useFileImage";
import {useSendRemedyMutation} from "../../redux/api/doctorApi";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";

const RemedyModal = ({toggle, toggleHandler, patient}) => {
	const {t} = useTranslation();
	// @ts-ignore
	const lang = useSelector((state) => state.reducer.lang.lang);
	const {fileDataURL, changeHandler, handleResetFile, fileInputRef} =
		useFileImage();
	const [sendRemedy, {isSuccess}] = useSendRemedyMutation();
	useEffect(() => {
		if (isSuccess) {
			toast.success("Send remedy successfully");
			toggleHandler();
		}
	}, [isSuccess]);

	return (
		<div>
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
										email: patient?.patientData?.email || "",
										image: " ",
									}}
									enableReinitialize={true}
									// validationSchema={loginSchema}
									onSubmit={(values, {setSubmitting, resetForm}) => {
										setTimeout(() => {
											// resetForm();
											sendRemedy({
												...values,
												image: fileDataURL,
												doctorId: patient?.doctorId,
												patientId: patient?.patientId,
												timeType: patient?.timeType,
												patientName: patient?.patientData?.firstName,
												lang: lang,
											});
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

											<div className="grid grid-cols-2 gap-5">
												<MyTextInput
													label={t("patient.booking-modal.email")}
													name="email"
													type="email"
													placeholder="tincr7@gmail.com"
												/>
												<MyFileInput
													label="Chọn file đơn thuốc"
													name="image"
													fileInputRef={fileInputRef}
													changeHandler={changeHandler}
												/>
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
		</div>
	);
};

export default RemedyModal;
