import React from "react";
import CardNew from "../components/card/CardNew";
import {useGetAllSpecialtyQuery} from "../redux/api/specialtyApi";
import path from "../constants/path";
import {Link} from "react-router-dom";
import {FaArrowLeft} from "react-icons/fa";

const ListSpecialty = () => {
	const {data} = useGetAllSpecialtyQuery(20);

	return (
		<div className="">
			<div className="flex items-center  w-full h-12  shadow-md px-5">
				<Link
					to={path.home}
					className=" w-10 justify-center flex items-center  h-full"
				>
					<FaArrowLeft size={20} />
				</Link>
				<span className="text-xl capitalize font-medium">chuyên khoa</span>
			</div>

			<div className="p-5">
				<div className="grid grid-cols-4 gap-10 ">
					{data?.map((item) => (
						<CardNew item={item} />
					))}
				</div>
			</div>
		</div>
	);
};

export default ListSpecialty;
