import {Formik, useFormik} from "formik";
import {useEffect} from "react";
import {toast} from "react-toastify";
import {useCreateNewUserMutation} from "../../redux/api/userApi";
import Spinner from "../../components/spin/Spinner";
import {userSchema} from "../../utils/validate";
import UserTable from "./UserTable";
import useFileImage from "../../hooks/useFileImage";
import MyTextInput from "../../components/input/MyTextInput";
import MySelect from "../../components/select/MySelect";
import MyFileInput from "../../components/input/MyFileInput";
import MyTextarea from "../../components/textarea/MyTextarea";

const ManageUser = () => {
	const [createNewUser, {isSuccess}] = useCreateNewUserMutation();
	const {fileDataURL, changeHandler, handleResetFile, fileInputRef} =
		useFileImage();

	useEffect(() => {
		if (isSuccess) {
			toast.success("Create new user successfully");
		}
	}, [isSuccess]);

	return (
		<div>
			<h2 className="text-center pb-10">Quản lý người dùng</h2>
			<Formik
				initialValues={{
					firstName: "",
					lastName: "",
					email: "",
					password: "",
					roleId: "",
					address: "",
					phone: "",
					image: "",
					genderId: "",
				}}
				validationSchema={userSchema}
				onSubmit={(values, {setSubmitting, resetForm}) => {
					setTimeout(() => {
						const data = {
							...values,
							image: fileDataURL,
						};
						createNewUser(data);
						setSubmitting(false);
						handleResetFile();
						resetForm();
					}, 1000);
				}}
			>
				{(formik) => (
					<form onSubmit={formik.handleSubmit}>
						<div className="grid gap-5 grid-cols-2 pb-5">
							<MyTextInput label="First Name" name="firstName" type="text" />
							<MyTextInput label="Last Name" name="lastName" type="text" />
							<MySelect label="Gender" name="genderId">
								<option value="">Select Gender</option>
								<option value="M">Male</option>
								<option value="F">Female</option>
								<option value="O">Other</option>
							</MySelect>
							<MySelect label="Role" name="roleId">
								<option value="">Select Role</option>
								<option value="R1">Admin</option>
								<option value="R2">Doctor</option>
								<option value="R3">Patient</option>
							</MySelect>

							<MyTextInput label="Phone" name="phone" type="number" />
							<MyTextInput label="Email" name="email" type="email" />
							<MyTextInput label="Password" name="password" type="password" />
							<MyFileInput
								label="Upload file"
								name="image"
								fileInputRef={fileInputRef}
								changeHandler={changeHandler}
							/>
							<MyTextarea label="address" name="address" />
						</div>

						<button
							type="submit"
							className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						>
							{formik.isSubmitting ? <Spinner /> : "Submit"}
						</button>
					</form>
				)}
			</Formik>

			{/* <UserTable /> */}
		</div>
	);
};

export default ManageUser;
