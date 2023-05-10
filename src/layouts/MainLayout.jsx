import React, {Children} from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import {Outlet} from "react-router-dom";

const MainLayout = () => {
	return (
		<div>
			<Header />
			<div className="min-h-[90vh]">
				<Outlet />
			</div>
			<Footer />
		</div>
	);
};

export default MainLayout;
