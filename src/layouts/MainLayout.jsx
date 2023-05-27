import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import {Outlet, useLocation} from "react-router-dom";
import path from "../constants/path";

const MainLayout = () => {
	const location = useLocation();

	return (
		<div>
			{!location.pathname.includes(path.doctor) &&
				!location.pathname.includes(path.specialty) && <Header />}
			<div className="min-h-[90vh]">
				<Outlet />
			</div>
			<Footer />
		</div>
	);
};

export default MainLayout;
