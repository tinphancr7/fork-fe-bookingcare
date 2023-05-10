import React, {useEffect} from "react";
import Meta from "../components/meta/Meta";
import BreadCrumb from "../components/bread-crumb/BreadCrumb";

import {Link, useNavigate} from "react-router-dom";
import {loginSchema} from "../utils/validate";
import {Formik} from "formik";
import {useDispatch} from "react-redux";
import {useLoginUserMutation} from "../redux/api/authApi";
import {setCredentials} from "../redux/features/userSlice";
import MyTextInput from "../components/input/MyTextInput";
import Spinner from "../components/spin/Spinner";

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [loginUser, {isSuccess, data, isError, error}] = useLoginUserMutation();

	useEffect(() => {
		if (isSuccess) {
			dispatch(setCredentials(data));
			navigate("/");
		}
	}, [isSuccess, navigate]);

	return (
		<div>
			<Meta title={"Login"} />
			<BreadCrumb title="Login" />
			<section className="bg-gray-50 dark:bg-gray-900">
				<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
					<a
						href="#"
						className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
					>
						<img
							className="w-8 h-8 mr-2"
							src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
							alt="logo"
						/>
						Flowbite
					</a>
					<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
						<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
							<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
								Sign in to your account
							</h1>
							<Formik
								initialValues={{
									email: "",
									password: "",
								}}
								validationSchema={loginSchema}
								onSubmit={(values, {setSubmitting, resetForm}) => {
									setTimeout(() => {
										loginUser(values);
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
										<div className="col-span-6 sm:col-span-6">
											<MyTextInput
												label="Email"
												name="email"
												type="email"
												placeholder="tincr7@gmail.com"
											/>
										</div>
										<div className="col-span-6 sm:col-span-6">
											<MyTextInput
												label="Password"
												name="password"
												type="password"
											/>
										</div>

										<div className="flex items-center justify-between">
											<div className="flex items-start">
												<div className="flex items-center h-5">
													<input
														id="remember"
														aria-describedby="remember"
														type="checkbox"
														className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
													/>
												</div>
												<div className="ml-3 text-sm">
													<label
														htmlFor="remember"
														className="text-gray-500 dark:text-gray-300"
													>
														Remember me
													</label>
												</div>
											</div>
											<a
												href="#"
												className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
											>
												Forgot password?
											</a>
										</div>
										<button
											type="submit"
											className="w-full bg-blue-500 p-2 rounded-md text-white "
										>
											{formik.isSubmitting ? <Spinner /> : "Login"}
										</button>
										<p className="text-sm font-light text-gray-500 dark:text-gray-400">
											Don’t have an account yet?{" "}
											<Link
												to="/signup"
												className="font-medium text-primary-600 hover:underline dark:text-primary-500"
											>
												Signup
											</Link>
										</p>
									</form>
								)}
							</Formik>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Login;
