import React, {useEffect} from "react";
import Spinner from "../../components/spin/Spinner";
import {Form, Formik} from "formik";
import useFileImage from "../../hooks/useFileImage";
import Editor from "../../components/editor/Editor";
import MyTextInput from "../../components/input/MyTextInput";
import MyFileInput from "../../components/input/MyFileInput";
import {useCreateSpcialtyMutation} from "../../redux/api/specialtyApi";
import {toast} from "react-toastify";
import {specialtySchema} from "../../utils/validate";

const ManageSpecialty = () => {
	const {fileDataURL, changeHandler, handleResetFile, fileInputRef} =
		useFileImage();
	const [createSpcialty, {isSuccess}] = useCreateSpcialtyMutation();
	useEffect(() => {
		if (isSuccess) {
			toast.success("Create new specialty successfully");
		}
	}, [isSuccess]);

	return (
		<div>
			<h2 className="text-center pb-5 capitalize">Quản lý chuyên khoa</h2>
			<Formik
				initialValues={{
					nameVi: "",
					nameEn: "",
					description: "",
					image: "",
				}}
				validationSchema={specialtySchema}
				onSubmit={(values, {setSubmitting, resetForm}) => {
					setTimeout(() => {
						createSpcialty({
							...values,
							image: fileDataURL,
						});
						resetForm();
						handleResetFile();
						setSubmitting(false);
					}, 1000);
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
							<MyFileInput
								label="Upload file"
								name="image"
								fileInputRef={fileInputRef}
								changeHandler={changeHandler}
							/>
						</div>
						<Editor
							label="Mô tả"
							name="description"
							placeholder="Write something awesome..."
						/>

						<button
							type="submit"
							className="w-full bg-blue-500 p-2 rounded-md text-white capitalize"
						>
							{formik.isSubmitting ? <Spinner /> : "Add new specialty"}
						</button>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default ManageSpecialty;
