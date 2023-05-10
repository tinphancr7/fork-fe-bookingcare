import React, {useRef, useState} from "react";
// Import Swiper React components
import {Swiper, SwiperSlide} from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import required modules
import {FreeMode, Pagination, Autoplay} from "swiper";
import CardBlog from "../card/CardBlog";

const BlogList = () => {
	return (
		<div className="wrapper ">
			<Swiper
				slidesPerView={4}
				spaceBetween={40}
				freeMode={true}
				autoplay={{
					delay: 3000,
					disableOnInteraction: false,
				}}
				modules={[FreeMode, Pagination, Autoplay]}
				className="mySwiper"
			>
				<SwiperSlide>
					<CardBlog />
				</SwiperSlide>
				<SwiperSlide>
					<CardBlog />
				</SwiperSlide>
				<SwiperSlide>
					<CardBlog />
				</SwiperSlide>
				<SwiperSlide>
					<CardBlog />
				</SwiperSlide>
				<SwiperSlide>
					<CardBlog />
				</SwiperSlide>
				<SwiperSlide>
					<CardBlog />
				</SwiperSlide>
				<SwiperSlide>
					<CardBlog />
				</SwiperSlide>
			</Swiper>
		</div>
	);
};

export default BlogList;
