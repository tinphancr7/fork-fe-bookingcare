import React from "react";
import {Swiper, SwiperSlide} from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import {Navigation, Pagination} from "swiper";
import {Link} from "react-router-dom";
import {handleParseBufferImage} from "../../utils/helpers";
import {useGetAllHandBookQuery} from "../../redux/api/handbookApi";
const HandBook = () => {
	const {data, isSuccess} = useGetAllHandBookQuery();

	return (
		<div className="shadow bg-bgGray">
			<div className="wrapper py-7">
				<div className="flex justify-between items-center pb-10">
					<h2 className="pb-5">Cẩm nang</h2>
					<button
						type="button"
						className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
					>
						Xem thêm
					</button>
				</div>
				<Swiper
					slidesPerView={2}
					spaceBetween={30}
					modules={[Navigation, Pagination]}
					className="mySwiper"
					navigation={true}
				>
					{data?.map((item, index) => (
						<SwiperSlide key={index}>{handleBookItem(item)}</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
};

const handleBookItem = (item) => {
	return (
		<Link
			to={`/handbooks/${item?.id}`}
			className=" flex gap-5  rounded-lg dark:bg-gray-800 dark:border-gray-700"
		>
			<div className="h-[150px] w-full block">
				<img
					className="rounded-t-lg w-full h-full object-cover"
					src={item?.image ? handleParseBufferImage(item?.image) : ""}
					alt=""
				/>
				<img
					src="https://cdn.bookingcare.vn/fr/w300/2023/04/28/084948-nam-da-chan.png"
					alt=""
				/>
			</div>

			<h5 className=" text-lg leading-7 hover:text-primary font-medium tracking-tight text-gray-900 dark:text-white">
				Cảnh giác với Nấm da chân: Biểu hiện, nguyên nhân, cách chữa nấm da chân
			</h5>
		</Link>
	);
};
export default HandBook;
