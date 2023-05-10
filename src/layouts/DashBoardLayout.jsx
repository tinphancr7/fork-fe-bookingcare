import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import {
	AiOutlineBgColors,
	AiOutlineDashboard,
	AiOutlineShoppingCart,
	AiOutlineUser,
	AiOutlineUserAdd,
} from "react-icons/ai";
import {GiDoctorFace} from "react-icons/gi";
import {GrUserAdmin, GrUserManager} from "react-icons/gr";
import {ImBlog} from "react-icons/im";
import {RiAdminLine, RiCouponLine} from "react-icons/ri";
import {FaClipboardList, FaBloggerB} from "react-icons/fa";
import {MdOutlineFolderSpecial} from "react-icons/md";
import {IoIosNotifications, IoMdNotifications} from "react-icons/io";
import {Breadcrumb, Button, Layout, Menu, theme} from "antd";
import {useState} from "react";
import {Outlet, useNavigate} from "react-router-dom";
import {BiListPlus} from "react-icons/bi";

const {Header, Sider, Content} = Layout;
const DashBoardLayout = () => {
	const currentUrl = window.location.href;
	const urlComponents = currentUrl.split("/");

	const [collapsed, setCollapsed] = useState(false);
	const {
		token: {colorBgContainer},
	} = theme.useToken();
	const navigate = useNavigate();
	return (
		<Layout className="min-h-[100vh]">
			<Sider trigger={null} collapsible collapsed={collapsed}>
				<div className="logo" />
				<Menu
					theme="dark"
					mode="inline"
					defaultSelectedKeys={[""]}
					onClick={({key}) => {
						if (key == "signout") {
						} else {
							navigate(key);
						}
					}}
					items={[
						{
							key: "",
							icon: <AiOutlineDashboard className="font-medium" />,
							label: "Dashboard",
						},

						{
							key: "admin",
							icon: <RiAdminLine className="font-medium text-white" />,
							label: "Admin",
							children: [
								{
									key: "admin/manage-user",
									icon: <MdOutlineFolderSpecial className="font-medium" />,
									label: "Manage User",
								},
								{
									key: "admin/list-user",
									icon: <MdOutlineFolderSpecial className="font-medium" />,
									label: "List User",
								},
								{
									key: "admin/manage-specialty",
									icon: <MdOutlineFolderSpecial className="font-medium" />,
									label: "Manage Speciality",
								},
								{
									key: "admin/list-specialty",
									icon: <MdOutlineFolderSpecial className="font-medium" />,
									label: "List Speciality",
								},
								{
									key: "admin/manage-clinic",
									icon: <MdOutlineFolderSpecial className="font-medium" />,
									label: "Manage Clinic",
								},
								{
									key: "admin/list-clinic",
									icon: <MdOutlineFolderSpecial className="font-medium" />,
									label: "List Clinic",
								},
							],
						},
						{
							key: "doctor",
							icon: <GiDoctorFace className="font-medium" />,
							label: "Doctors",
							children: [
								{
									key: "doctor",
									icon: <AiOutlineUserAdd className="font-medium" />,
									label: "Add Doctor",
								},
								{
									key: "list-doctor",
									icon: <BiListPlus className="font-medium" />,
									label: "Doctor List",
								},
								{
									key: "doctor/manage-schedule",
									icon: <MdOutlineFolderSpecial className="font-medium" />,
									label: "Manage Schedule",
								},
							],
						},
						{
							key: "orders",
							icon: <FaClipboardList className="font-medium" />,
							label: "Orders",
						},
						{
							key: "marketing",
							icon: <RiCouponLine className="font-medium" />,
							label: "Marketing",
							children: [
								{
									key: "coupon",
									icon: <ImBlog className="font-medium" />,
									label: "Add Coupon",
								},
								{
									key: "coupon-list",
									icon: <RiCouponLine className="font-medium" />,
									label: "Coupon List",
								},
							],
						},
						{
							key: "blogs",
							icon: <FaBloggerB className="font-medium" />,
							label: "Blogs",
							children: [
								{
									key: "blog",
									icon: <ImBlog className="font-medium" />,
									label: "Add Blog",
								},
								{
									key: "list-blog",
									icon: <FaBloggerB className="font-medium" />,
									label: "Blog List",
								},
								{
									key: "blog-category",
									icon: <ImBlog className="font-medium" />,
									label: "Add Blog Category",
								},
								{
									key: "list-bcategory",
									icon: <FaBloggerB className="font-medium" />,
									label: "Blog Category List",
								},
							],
						},
						{
							key: "enquiries",
							icon: <FaClipboardList className="font-medium" />,
							label: "Enquiries",
						},
					]}
				/>
			</Sider>
			<Layout>
				<Header
					style={{
						padding: 0,
						background: colorBgContainer,
					}}
					className="flex  items-center"
				>
					<Button
						type="text"
						icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
						onClick={() => setCollapsed(!collapsed)}
						style={{
							fontSize: "16px",
							width: 64,
							height: 64,
						}}
					/>
					<Breadcrumb>
						{urlComponents.map((item, index) => {
							if (index > 2) {
								return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>;
							}
						})}
					</Breadcrumb>
				</Header>
				<Content
					style={{
						margin: "24px 16px",
						padding: 24,
						minHeight: 280,
						background: colorBgContainer,
					}}
				>
					<Outlet />
				</Content>
			</Layout>
		</Layout>
	);
};
export default DashBoardLayout;
