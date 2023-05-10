import {AiOutlineMenu} from "react-icons/ai";
import {Menu} from "../menu/Menu";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {logout} from "../../redux/features/userSlice";
import {handleParseBufferImage} from "../../utils/helpers";
import {Link} from "react-router-dom";

const Header = () => {
	const {t} = useTranslation();
	const [toggle, setToggle] = useState(false);
	// @ts-ignore
	const userInfo = useSelector((state) => state.reducer.user.userInfo);

	return (
		<div className="bg-white flex justify-between items-center px-10 py-4 shadow">
			<div className="flex justify-between items-center gap-2">
				<span>
					<AiOutlineMenu size={30} />
				</span>
				<Link to="/">
					<img
						src="https://bookingcare.vn/assets/icon/bookingcare-2020.svg"
						className="h-[40px] "
						alt=""
					/>
				</Link>
			</div>
			<div className="flex justify-between items-center gap-5">
				<div>
					<h4>{t("homeheader.specialty")}</h4>
					<span className="text-xs font-light">
						{t("homeheader.search-doctor")}
					</span>
				</div>
				<div>
					<h4>{t("homeheader.health-facility")}</h4>
					<span className="text-xs font-light">
						{t("homeheader.select-room")}
					</span>
				</div>
				<div>
					<h4>{t("homeheader.doctor")}</h4>
					<span className="text-xs font-light">
						{t("homeheader.select-doctor")}
					</span>
				</div>
				<div>
					<h4>{t("homeheader.fee")}</h4>
					<span className="text-xs font-light">
						{t("homeheader.check-health")}
					</span>
				</div>
			</div>
			<div className="flex justify-center items-center gap-2 relative">
				{userInfo && (
					<div>
						{userInfo?.image ? (
							<button
								id="dropdownUserAvatarButton"
								data-dropdown-toggle="dropdownAvatar"
								className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
								type="button"
								onClick={() => setToggle(!toggle)}
							>
								<span className="sr-only">Open user menu</span>
								<img
									className="w-8 h-8 rounded-full"
									src={handleParseBufferImage(userInfo?.image) || ""}
								/>
							</button>
						) : (
							<button
								id="dropdownUserAvatarButton"
								data-dropdown-toggle="dropdownAvatar"
								className="flex mx-3 text-sm  rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
								type="button"
								onClick={() => setToggle(!toggle)}
							>
								<div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-[#ef6c00] rounded-full dark:bg-gray-600">
									<span className="font-medium text-white uppercase dark:text-gray-300">{`${userInfo.firstName.charAt(
										0
									)}${userInfo.lastName.charAt(0)}`}</span>
								</div>
							</button>
						)}
						{toggle ? <DropDown userInfo={userInfo} /> : null}
					</div>
				)}
				<Menu />
			</div>
		</div>
	);
};
const DropDown = ({userInfo}) => {
	const dispatch = useDispatch();
	const handleLogout = () => {
		dispatch(logout());
	};
	return (
		<div
			id="dropdownAvatar"
			className="z-10 absolute top-[50px] right-10  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
		>
			<div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
				<div>{userInfo?.firstName}</div>
				<div className="font-medium truncate">{userInfo?.email}</div>
			</div>
			<ul
				className="py-2 text-sm text-gray-700 dark:text-gray-200"
				aria-labelledby="dropdownUserAvatarButton"
			>
				<li>
					<a
						href="#"
						className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
					>
						Dashboard
					</a>
				</li>
				<li>
					<a
						href="#"
						className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
					>
						Settings
					</a>
				</li>
				<li>
					<a
						href="#"
						className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
					>
						Earnings
					</a>
				</li>
			</ul>
			<div className="py-2">
				<a
					href="#"
					className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
					onClick={handleLogout}
				>
					Sign out
				</a>
			</div>
		</div>
	);
};
export default Header;
