import {Route, Routes} from "react-router-dom";
import {Suspense, lazy} from "react";
import Spinner from "./components/spin/Spinner";

import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import MainLayout from "./layouts/MainLayout";
import NotFound from "./pages/NotFound";

import ManageUser from "./system/admin/ManageUser";
import ManageDoctor from "./system/admin/ManageDoctor";
import DetailDoctor from "./system/doctor/DetailDoctor";
import DashBoard from "./system/admin/DashBoard";
import ManageSchedule from "./system/doctor/ManageSchedule";
import VerifyEmailBooking from "./system/VerifyEmailBooking";
import ManageSpecialty from "./system/admin/ManageSpecialty";
import DetailSpecialty from "./pages/DetailSpecialty";
import ManageClinic from "./system/admin/ManageClinic";

import ManagePatient from "./system/doctor/ManagePatient";
import DashBoardLayout from "./layouts/DashBoardLayout";
import ManageHandBook from "./system/admin/ManageHandBook";
import DetailHandBook from "./pages/DetailHandBook";
import ListUser from "./system/admin/ListUser";
import ListSpecialty from "./pages/ListSpecialty";
import path from "./constants/path";
import DoctorList from "./pages/DoctorList";

const Home = lazy(() => import("./pages/Home"));
const SignupForm = lazy(() => import("./pages/SignupForm"));
const Login = lazy(() => import("./pages/Login"));
const Unauthorize = lazy(() => import("./pages/Unauthorize"));
const ProtectedRoute = lazy(() => import("./pages/ProtectedRoute"));
const Profile = lazy(() => import("./pages/Profile"));

function App() {
	return (
		<>
			<Suspense fallback={<Spinner />}>
				<Routes>
					<Route path="/" element={<MainLayout />}>
						<Route index element={<Home />} />
						<Route path="/signup" element={<SignupForm />} />
						<Route path="/login" element={<Login />} />
						<Route path="/unauthorized" element={<Unauthorize />} />
						<Route element={<ProtectedRoute />}>
							<Route path="/profile" element={<Profile />} />
						</Route>

						<Route path="/specialties/:id" element={<DetailSpecialty />} />
						<Route path={path.specialty} element={<ListSpecialty />} />
						<Route path={path.doctor} element={<DoctorList />} />
						<Route path="/handbooks/:id" element={<DetailHandBook />} />
						<Route path="/doctors/:id" element={<DetailDoctor />} />
						<Route
							path="/verify-book-appointment"
							element={<VerifyEmailBooking />}
						/>
					</Route>

					<Route path="/system" element={<DashBoardLayout />}>
						<Route index element={<DashBoard />} />
						<Route path="admin/manage-user" element={<ManageUser />} />
						<Route path="admin/manage-doctor" element={<ManageDoctor />} />
						<Route path="admin/list-user" element={<ListUser />} />
						<Route path="admin/manage-clinic" element={<ManageClinic />} />
						<Route
							path="admin/manage-specialty"
							element={<ManageSpecialty />}
						/>
						<Route path="admin/manage-handbook" element={<ManageHandBook />} />
						<Route path="doctor/manage-schedule" element={<ManageSchedule />} />
						<Route path="doctor/manage-patient" element={<ManagePatient />} />
					</Route>

					<Route path="*" element={<NotFound />} />
				</Routes>
			</Suspense>

			<ToastContainer
				position="top-right"
				autoClose={2000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
		</>
	);
}

export default App;
