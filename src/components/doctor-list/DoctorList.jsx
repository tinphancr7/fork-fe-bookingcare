import React, {useRef, useState} from "react";
// Import Swiper React components
import {Swiper, SwiperSlide} from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import {Navigation, Pagination} from "swiper";
import CardDoctor from "../card/CardDoctor";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {useGetTopDoctorsQuery} from "../../redux/api/doctorApi";
import {Link} from "react-router-dom";
import path from "../../constants/path";
const DoctorList = () => {
	// @ts-ignore
	const {data: doctors} = useGetTopDoctorsQuery();

	const {t} = useTranslation();
	return (
		<div className="shadow ">
			<div className="py-7 wrapper">
				<div className="flex justify-between pb-5">
					<h2 className=" capitalize">{t("homepage.outstanding-doctor")}</h2>
					<Link
						to={path.doctor}
						className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 capitalize"
					>
						{t("homepage.see-more")}
					</Link>
				</div>
				<Swiper
					slidesPerView={4}
					spaceBetween={30}
					modules={[Navigation, Pagination]}
					className="mySwiper"
					navigation={true}
				>
					{doctors?.map((doctor) => (
						<SwiperSlide key={doctor.id}>
							<CardDoctor doctor={doctor} key={doctor.id} />
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
};

export default DoctorList;
