import React from "react";
import {badge, badge2, bg} from "../../assets";
import {AiOutlineSearch} from "react-icons/ai";
import Card from "../card/Card";
import {services} from "../../utils/helpers";
import {useTranslation} from "react-i18next";

const Banner = () => {
	const {t} = useTranslation();
	return (
		<div
			style={{backgroundImage: `url(${bg})`}}
			className="bg-cover bg-no-repeat bg-center w-full h-[100vh]"
		>
			<div
				className="flex flex-col items-center min-h-[60vh]  py-10 text-center gap-5"
				style={{
					backgroundImage:
						"linear-gradient(rgba(0, 0, 0, 0.25),rgba(255, 255, 255, 0.1))",
				}}
			>
				<h1 className="text-4xl text-white ">
					<span>{t("banner.title")}</span> <br />
					<b className="capitalize block pt-2">{t("banner.title2")}</b>
				</h1>
				<div className="bg-[#f7d800] px-4 w-[500px] h-[50px] flex items-center rounded-full">
					<span className="inline-block">
						<AiOutlineSearch size={20} />
					</span>
					<input
						type="text"
						placeholder="Tìm kiếm ở đây"
						className="flex-1 focus:ring-0  border-none outline-none bg-transparent"
					/>
				</div>
				<div className="flex items-center gap-5 justify-center mt-10">
					<a href="https://bookingcare.vn/app/android">
						<img
							alt="Tải ứng dụng BookingCare trên Android"
							width="108"
							height="32"
							src={badge}
						/>
					</a>
					<a href="https://bookingcare.vn/app/ios">
						<img
							alt="Tải ứng dụng BookingCare trên iOS"
							width="108"
							height="32"
							src={badge2}
						/>
					</a>
				</div>
			</div>

			<div
				className="flex flex-wrap items-center justify-center py-5"
				style={{
					backgroundImage:
						"linear-gradient(rgba(255, 255, 255, 0.1),rgba(255, 255, 255, 0.9),rgba(255, 255, 255, 1))",
				}}
			>
				{services.map((item, index) => (
					<Card key={index} img={item.img} title={t(`banner.option${index}`)} />
				))}
			</div>
		</div>
	);
};

export default Banner;
