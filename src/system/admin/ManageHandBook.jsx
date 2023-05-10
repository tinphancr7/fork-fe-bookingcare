import React, {useEffect, useState} from "react";
import Spinner from "../../components/spin/Spinner";
import {Form, Formik} from "formik";
import useFileImage from "../../hooks/useFileImage";
import Editor from "../../components/editor/Editor";
import MyTextInput from "../../components/input/MyTextInput";
import MyFileInput from "../../components/input/MyFileInput";
import {toast} from "react-toastify";
import {useGetAllSpecialtyQuery} from "../../redux/api/specialtyApi";
import MySelect from "../../components/select/MySelect";
import {useCreateHandBookMutation} from "../../redux/api/handbookApi";
import MyQuill from "../../components/editor/MyQuill";

const ManageHandBook = () => {
	const {fileDataURL, changeHandler, handleResetFile, fileInputRef} =
		useFileImage();
	const {data: specialties} = useGetAllSpecialtyQuery(20);

	const [createHandBook, {isSuccess}] = useCreateHandBookMutation();
	useEffect(() => {
		if (isSuccess) {
			toast.success("Create new handbook successfully");
		}
	}, [isSuccess]);

	return (
		<div>
			<h2 className="text-center pb-5 capitalize">Quản lý chuyên khoa</h2>
			<Formik
				initialValues={{
					title: "",
					specialtyId: "",
					intro: "",
					description: "",
					image: "",
				}}
				// validationSchema={loginSchema}
				onSubmit={(values, {setSubmitting, resetForm}) => {
					setTimeout(() => {
						createHandBook({
							...values,
							image: fileDataURL,
						});
						resetForm();
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
							<MyTextInput label="title" name="title" type="text" />
							<MySelect label="Chuyên khoa" name="specialtyId">
								<option value="">Select menu</option>
								{specialties?.map((item) => (
									<option key={item.id} value={item.id}>
										{item.nameVi}
									</option>
								))}
							</MySelect>

							<MyFileInput
								label="Upload file"
								name="image"
								fileInputRef={fileInputRef}
								changeHandler={changeHandler}
							/>
						</div>
						<MyQuill
							label="Giới thiệu"
							name="intro"
							placeholder="Write something awesome..."
						/>

						<Editor
							label="Mô tả"
							name="description"
							placeholder="Write something awesome..."
						/>

						<button
							type="submit"
							className="w-[100px] bg-blue-500 p-2 rounded-md text-white capitalize"
						>
							{formik.isSubmitting ? <Spinner /> : "Add "}
						</button>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default ManageHandBook;
