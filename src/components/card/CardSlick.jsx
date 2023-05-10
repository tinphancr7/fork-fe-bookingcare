import {useSelector} from "react-redux";
import {card} from "../../assets";
import {handleParseBufferImage} from "../../utils/helpers";
import {Link} from "react-router-dom";

const CardSlick = ({item, isTopDoctor = false}) => {
	// @ts-ignore
	const lang = useSelector((state) => state.reducer.lang.lang);
	return (
		<Link
			to={`/specialties/${item?.id}`}
			className="max-w-sm  rounded-lg dark:bg-gray-800 dark:border-gray-700"
		>
			<div className="h-[150px] w-full block bg-white">
				<img
					className={`${
						isTopDoctor
							? "w-full h-full object-contain px-2"
							: "w-full h-full object-cover"
					}`}
					src={item?.image ? handleParseBufferImage(item?.image) : ""}
					alt=""
				/>
			</div>

			<div className="pt-2">
				<h5 className=" text-sm font-medium tracking-tight text-gray-900 dark:text-white">
					{lang === "vi" ? item?.nameVi : item?.nameEn}
				</h5>
			</div>
		</Link>
	);
};

export default CardSlick;
