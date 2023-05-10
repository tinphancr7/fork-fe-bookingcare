import React, {useEffect} from "react";
import Spinner from "../../components/spin/Spinner";
import {Form, Formik} from "formik";
import useFileImage from "../../hooks/useFileImage";
import Editor from "../../components/editor/Editor";
import MyTextInput from "../../components/input/MyTextInput";
import MyFileInput from "../../components/input/MyFileInput";
import {toast} from "react-toastify";
import {useCreateClinicMutation} from "../../redux/api/clinicApi";

const ManageClinic = () => {
	const {fileDataURL, changeHandler, handleResetFile, fileInputRef} =
		useFileImage();
	const [createClinic, {isSuccess}] = useCreateClinicMutation();
	useEffect(() => {
		if (isSuccess) {
			toast.success("Create new Clinic successfully");
		}
	}, [isSuccess]);

	return (
		<div>
			<h2 className="text-center pb-5 capitalize">Quản lý chuyên khoa</h2>
			<Formik
				initialValues={{
					nameVi: "",
					nameEn: "",
					address: "",
					description: "",
					image: "",
				}}
				// validationSchema={loginSchema}
				onSubmit={(values, {setSubmitting, resetForm}) => {
					setTimeout(() => {
						createClinic({
							...values,
							image: fileDataURL,
						});
						// resetForm();
						handleResetFile();
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
							<MyTextInput label="nameVi" name="nameVi" type="text" />
							<MyTextInput label="nameEn" name="nameEn" type="text" />
							<MyTextInput label="address" name="address" type="text" />
							<MyFileInput
								label="Upload file"
								name="image"
								fileInputRef={fileInputRef}
								changeHandler={changeHandler}
							/>
						</div>
						<Editor
							placeholder="Write something awesome..."
							label="dsd"
							name="description"
							onChange={(value) => formik.setFieldValue("description", value)}
						/>

						<button
							type="submit"
							className="w-full bg-blue-500 p-2 rounded-md text-white capitalize"
						>
							{formik.isSubmitting ? <Spinner /> : "Add new Clinic"}
						</button>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default ManageClinic;
