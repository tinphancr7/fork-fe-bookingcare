import React from "react";
import {handleParseBufferImage} from "../../utils/helpers";
import {Link} from "react-router-dom";

const CardNew = ({item}) => {
	return (
		<Link
			to={`/specialties/${item?.id}`}
			className=" bg-white border border-gray-200 rounded-lg shadow "
		>
			<img
				className="rounded-t-lg w-full h-[200px]"
				src={item?.image ? handleParseBufferImage(item?.image) : ""}
				alt=""
			/>
			<div className="p-5">
				<h5 className="mb-2 text-lg text-center capitalize font-bold tracking-tight text-gray-900 dark:text-white">
					{item?.nameVi}
				</h5>
			</div>
		</Link>
	);
};

export default CardNew;
