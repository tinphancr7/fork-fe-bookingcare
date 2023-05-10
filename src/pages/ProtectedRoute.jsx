// ProtectedRoute.js
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {NavLink, Outlet, useNavigate} from "react-router-dom";

const ProtectedRoute = () => {
	const navigate = useNavigate();
	// @ts-ignore
	const {userInfo} = useSelector((state) => state.reducer.user.userInfo);

	// show unauthorized screen if no user is found in redux store
	if (userInfo && userInfo.isAdmin) {
		return (
			<>
				<Outlet />
			</>
		);
	} else {
		useEffect(() => {
			navigate("/unauthorized");
		}, [navigate]);
	}
};
export default ProtectedRoute;
