import React from "react";
import {useTranslation} from "react-i18next";

const Card = ({img, title}) => {
	let s = title.split(/(?<=^\S+)\s/);

	const {t} = useTranslation();
	return (
		<div className="w-[230px]  p-[5px] flex flex-col items-center justify-center gap-2 ">
			<div className="bg-white rounded-full p-2 w-[50px] h-[50px] boxShadow flex items-center">
				<img src={img} alt="" className="w-[30px] object-cover" />
			</div>
			<span className="text-center font-bold hover:text-primary opacity-80 cursor-pointer">
				{s[0]} <br /> {s[1]}
			</span>
		</div>
	);
};

export default Card;
