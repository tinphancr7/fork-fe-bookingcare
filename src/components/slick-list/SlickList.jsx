import React, {useRef, useState} from "react";
// Import Swiper React components
import {Swiper, SwiperSlide} from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import {Navigation, Pagination} from "swiper";
import CardSlick from "../card/CardSlick";
import {Link} from "react-router-dom";

const SlickList = ({title, bg, data, isTopDoctor, path}) => {
	return (
		<div className={`shadow  bg-${bg}`}>
			<div className="wrapper py-7">
				<div className="flex justify-between items-center pb-5">
					<h2>{title}</h2>
					<Link
						to={path}
						className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
					>
						Xem thêm
					</Link>
				</div>
				<Swiper
					slidesPerView={4}
					spaceBetween={30}
					modules={[Navigation, Pagination]}
					className="mySwiper"
					navigation={true}
				>
					{data?.map((item, index) => (
						<SwiperSlide key={index}>
							<CardSlick item={item} isTopDoctor={isTopDoctor} />
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
};

export default SlickList;
