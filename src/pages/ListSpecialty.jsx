import React from "react";
import CardNew from "../components/card/CardNew";
import {useGetAllSpecialtyQuery} from "../redux/api/specialtyApi";

const ListSpecialty = () => {
	const {data} = useGetAllSpecialtyQuery(20);

	return (
		<div className=" wrapper mt-5">
			<h2 className="uppercase text-center text-lg pb-5 font-bold text-primary">
				danh sách chuyên khoa
			</h2>
			<div className="grid grid-cols-4 gap-10 ">
				{data?.map((item) => (
					<CardNew item={item} />
				))}
			</div>
		</div>
	);
};

export default ListSpecialty;
