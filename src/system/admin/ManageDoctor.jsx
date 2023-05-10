import React, {useEffect, useMemo, useState} from "react";
import {toast} from "react-toastify";
import {
	useAddInfoDoctorMutation,
	useGetDetailDoctorByIdQuery,
	useGetDoctorsQuery,
} from "../../redux/api/doctorApi";
import {Form, Formik} from "formik";
import {markdownSchema} from "../../utils/validate";
import MyTextarea from "../../components/textarea/MyTextarea";
import Editor from "../../components/editor/Editor";
import Spinner from "../../components/spin/Spinner";
import MyTextInput from "../../components/input/MyTextInput";
import {useGetAllCodeServiceQuery} from "../../redux/api/userApi";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import MySelect from "../../components/select/MySelect";
import {getDataAllCode} from "../../utils/helpers";
import {useGetAllSpecialtyQuery} from "../../redux/api/specialtyApi";
import {useGetClinicQuery} from "../../redux/api/clinicApi";

const ManageDoctor = () => {
	const {t} = useTranslation();

	const [addInfoDoctor, {isSuccess}] = useAddInfoDoctorMutation();
	// @ts-ignore
	const lang = useSelector((state) => state.reducer.lang.lang);
	const {data: doctors} = useGetDoctorsQuery();
	const {data: prices} = useGetAllCodeServiceQuery("price");
	const {data: provinces} = useGetAllCodeServiceQuery("province");
	const {data: payments} = useGetAllCodeServiceQuery("payment");
	const optionsDoctor = useMemo(
		() => getDataAllCode(doctors, lang, true),
		[doctors, lang]
	);
	const optionsPrice = useMemo(
		() => getDataAllCode(prices, lang),
		[prices, lang]
	);

	const optionsProvince = useMemo(
		() => getDataAllCode(provinces, lang),
		[provinces, lang]
	);
	const optionsPayment = useMemo(
		() => getDataAllCode(payments, lang),
		[payments, lang]
	);

	const [selectedDoctorId, setSelectedDoctorId] = useState("");
	const {data: doctorInfo} = useGetDetailDoctorByIdQuery(selectedDoctorId, {
		skip: !selectedDoctorId,
	});

	const {data: optionsSpecialty} = useGetAllSpecialtyQuery(20);
	const {data: optionsClinic} = useGetClinicQuery();

	const handleDoctorIdChange = (selectedValue) => {
		setSelectedDoctorId(selectedValue);
	};

	useEffect(() => {
		if (isSuccess) {
			toast.success("Add info doctor successfully");
		}
	}, [isSuccess]);

	return (
		<div className="max-w-[1000px] mx-auto mt-5">
			<h2 className="text-center pb-5">{t("admin.manage-doctor.title")}</h2>
			<Formik
				initialValues={{
					doctorId: "",
					positionId: doctorInfo?.positionId || "",
					priceId: doctorInfo?.priceId || "",
					clinicId: doctorInfo?.clinicId || "",
					paymentId: doctorInfo?.paymentId || "",
					provinceId: doctorInfo?.provinceId || "",
					nameClinic: doctorInfo?.nameClinic || "",
					addressClinic: doctorInfo?.addressClinic || "",
					note: doctorInfo?.note || "",
					contentHTML: doctorInfo?.Markdown?.contentHTML || "",
					description: doctorInfo?.Markdown?.description || "",
					specialtyId: doctorInfo?.specialtyId || "",
				}}
				enableReinitialize={true}
				// validationSchema={markdownSchema}
				onSubmit={(values, {setSubmitting, resetForm}) => {
					setTimeout(() => {
						addInfoDoctor({...values, doctorId: selectedDoctorId});
						// resetForm();
						setSubmitting(false);
					}, 2000);
				}}
			>
				{(formik) => (
					<Form
						onSubmit={formik.handleSubmit}
						className="space-y-4 md:space-y-6"
					>
						<div className="grid grid-cols-2 gap-5">
							<MySelect
								label={t("admin.manage-doctor.select-doctor")}
								handleDoctorIdChange={handleDoctorIdChange}
								name="doctorId"
							>
								<option value="">Select menu</option>
								{optionsDoctor?.map((item) => (
									<option key={item.value} value={item.value}>
										{item.label}
									</option>
								))}
							</MySelect>
							<MySelect label="Position" name="positionId">
								<option value="">Select Menu</option>
								<option value="P0">Bác sĩ</option>
								<option value="P1">Thạc sĩ</option>
								<option value="P2">Tiến sĩ</option>
								<option value="P3">Phó giáo sư</option>
								<option value="P4">Giáo sư</option>
							</MySelect>
							<MySelect label={t("admin.manage-doctor.price")} name="priceId">
								<option value="">Select menu</option>
								{optionsPrice?.map((item) => (
									<option key={item.value} value={item.value}>
										{item.label}
									</option>
								))}
							</MySelect>
							<MySelect
								label={t("admin.manage-doctor.payment")}
								name="paymentId"
							>
								<option value="">Select menu</option>
								{optionsPayment?.map((item) => (
									<option key={item.value} value={item.value}>
										{item.label}
									</option>
								))}
							</MySelect>
							<MySelect
								label={t("admin.manage-doctor.province")}
								name="provinceId"
							>
								<option value="">Select menu</option>
								{optionsProvince?.map((item) => (
									<option key={item.value} value={item.value}>
										{item.label}
									</option>
								))}
							</MySelect>
							<MySelect
								label={t("admin.manage-doctor.select-specialty")}
								name="specialtyId"
							>
								<option value="">Select menu</option>
								{optionsSpecialty?.map((item) => (
									<option key={item.id} value={item.id}>
										{item?.nameVi}
									</option>
								))}
							</MySelect>
							<MySelect
								label={t("admin.manage-doctor.select-clinic")}
								name="clinicId"
							>
								<option value="">Select menu</option>
								{optionsClinic?.map((item) => (
									<option key={item.id} value={item.id}>
										{item?.nameVi}
									</option>
								))}
							</MySelect>

							<MyTextInput
								label={t("admin.manage-doctor.nameClinic")}
								name="nameClinic"
							/>
							<MyTextarea
								label={t("admin.manage-doctor.addressClinic")}
								name="addressClinic"
							/>
							<MyTextarea label={t("admin.manage-doctor.note")} name="note" />
						</div>
						<MyTextarea
							label={t("admin.manage-doctor.info")}
							name="description"
						/>
						<Editor
							placeholder="Write something awesome..."
							label="Content"
							name="contentHTML"
						/>

						<button
							type="submit"
							className="w-full bg-blue-500 max-w-[150px] p-2 rounded-md text-white "
						>
							{formik.isSubmitting ? <Spinner /> : "Add"}
						</button>
					</Form>
				)}
			</Formik>

			<div></div>
		</div>
	);
};

export default ManageDoctor;
