import {Route, Routes} from "react-router-dom";
import {Suspense, lazy} from "react";
import Spinner from "./components/spin/Spinner";

import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import path from "./constants/path";

const Home = lazy(() => import("./pages/Home"));
const SignupForm = lazy(() => import("./pages/SignupForm"));
const Login = lazy(() => import("./pages/Login"));
const Unauthorize = lazy(() => import("./pages/Unauthorize"));
const ProtectedRoute = lazy(() => import("./pages/ProtectedRoute"));
const Profile = lazy(() => import("./pages/Profile"));
const ManageHandBook = lazy(() => import("./system/admin/ManageHandBook"));
const ManageDoctor = lazy(() => import("./system/admin/ManageDoctor"));
const ManageSpecialty = lazy(() => import("./system/admin/ManageSpecialty"));
const ManageClinic = lazy(() => import("./system/admin/ManageClinic"));
const ManageSchedule = lazy(() => import("./system/doctor/ManageSchedule"));
const ManagePatient = lazy(() => import("./system/doctor/ManagePatient"));
const ManageUser = lazy(() => import("./system/admin/ManageUser"));
const ListUser = lazy(() => import("./system/admin/ListUser"));

const NotFound = lazy(() => import("./pages/NotFound"));
const MainLayout = lazy(() => import("./layouts/MainLayout"));
const DashBoardLayout = lazy(() => import("./layouts/DashBoardLayout"));
const ListSpecialty = lazy(() => import("./pages/ListSpecialty"));
const DetailSpecialty = lazy(() => import("./pages/DetailSpecialty"));
const DetailHandBook = lazy(() => import("./pages/DetailHandBook"));

const DoctorList = lazy(() => import("./pages/DoctorList"));
const VerifyEmailBooking = lazy(() => import("./system/VerifyEmailBooking"));
const DetailDoctor = lazy(() => import("./system/doctor/DetailDoctor"));
const DashBoard = lazy(() => import("./system/admin/DashBoard"));

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
