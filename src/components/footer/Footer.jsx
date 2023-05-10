import React from "react";
import {ImCheckmark, ImLocation2} from "react-icons/im";
import {Link} from "react-router-dom";
const Footer = () => {
	return (
		<div className=" bg-[#efefef] mt-10">
			<div className="wrapper py-10">
				<div className="grid grid-cols-4 gap-5">
					<div className="col-span-2">
						<img
							src="https://bookingcare.vn/assets/icon/bookingcare-2020.svg"
							alt=""
							className="max-w-[200px]"
						/>
						<h4>Công ty Cổ phần Công nghệ BookingCare</h4>
						<p className="flex gap-2">
							<span>
								<ImLocation2 />
							</span>
							Lô B4/D21, Khu đô thị mới Cầu Giấy, Phường Dịch Vọng Hậu, Quận Cầu
							Giấy, Thành phố Hà Nội, Việt Nam
						</p>
						<p className="flex gap-2">
							<span>
								<ImCheckmark />
							</span>
							ĐKKD số: 0106790291. Sở KHĐT Hà Nội cấp ngày 16/03/2015
						</p>
						<div className="flex gap-5">
							<a
								className="an-ud"
								target="_blank"
								href="http://online.gov.vn/Home/WebDetails/68563"
							>
								<img
									className="nut-bct luoi"
									src="https://bookingcare.vn/assets/icon/bo-cong-thuong.svg"
									width="78"
									height="30"
									data-src="/assets/icon/bo-cong-thuong.svg"
									alt="Đã thông báo với bộ công thương"
								/>
							</a>
							<a
								target="_blank"
								href="http://online.gov.vn/Home/AppDetails/1101"
							>
								<img
									className="nut-bct luoi"
									src="https://bookingcare.vn/assets/icon/bo-cong-thuong.svg"
									width="78"
									height="30"
									data-src="/assets/icon/bo-cong-thuong.svg"
									alt="Đã thông báo với bộ công thương"
								/>
							</a>
						</div>
					</div>
					<div className="flex flex-col gap-2 text-primary ">
						<Link to="#">Liên hệ hợp tác</Link>
						<Link to="#">Sức khỏe doanh nghiệp</Link>
						<Link to="#">Gói chuyển đổi số doanh nghiệp</Link>
						<Link to="#">Tuyển dụng</Link>
						<Link to="#">Câu hỏi thường gặp</Link>
						<Link to="#">Điều khoản sử dụng</Link>
						<Link to="#">Chính sách Bảo mật</Link>
						<Link to="#">Quy trình hỗ trợ giải quyết khiếu nại</Link>
						<Link to="#">Quy chế hoạt động</Link>
					</div>
					<div className="flex flex-col gap-4">
						<div>
							<h4>Trụ sở tại Hà Nội</h4>
							<p className="text-sm">
								Lô B4/D21, Khu đô thị mới Cầu Giấy, Phường Dịch Vọng Hậu, Quận
								Cầu Giấy, Thành phố Hà Nội, Việt Nam
							</p>
						</div>
						<div>
							<h4>Văn phòng tại TP Hồ Chí Minh</h4>
							<p>Số 01, Hồ Bá Kiện, Phường 15, Quận 10</p>
						</div>
						<div>
							<h4>Hỗ trợ khách hàng</h4>
							<p>support@bookingcare.vn (7h - 18h)</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Footer;
