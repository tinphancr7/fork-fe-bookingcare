import React, {useEffect, useState} from "react";
import {FaArrowLeft} from "react-icons/fa";
import {useGetTopDoctorsQuery} from "../redux/api/doctorApi";
import {
	handleParseBufferImage,
	infoPosFullName,
	removeVietnameseDiacritics,
} from "../utils/helpers";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import path from "../constants/path";

const DoctorList = () => {
	// @ts-ignore
	const lang = useSelector((state) => state.reducer.lang.lang);
	const [doctors, setDoctors] = useState([]);
	const {data: doctorsData} = useGetTopDoctorsQuery();
	const handleSearchDoctor = (e) => {
		const newDoctors = doctorsData?.map((item) => {
			return {
				...item,
				title: `${item?.positionData?.valueVi} ${item?.doctorInfoData?.lastName} ${item?.doctorInfoData?.firstName}`,
			};
		});
		const result = newDoctors.filter((item) => {
			return (
				item?.title?.toLowerCase().includes(e.target.value) ||
				removeVietnameseDiacritics(item?.title?.toLowerCase()).includes(
					e.target.value
				)
			);
		});
		setDoctors(result);
	};
	useEffect(() => {
		if (doctorsData?.length > 0) {
			setDoctors(doctorsData);
		}
	}, [doctorsData]);

	return (
		<div>
			<div>
				<div className="flex items-center  w-full h-12  shadow-md px-5">
					<Link
						to={path.home}
						className=" w-10 justify-center flex items-center  h-full"
					>
						<FaArrowLeft size={20} />
					</Link>
					<span className="text-xl capitalize font-medium">Bác sĩ</span>
				</div>
				<div className="flex items-center justify-center bg-gray-100 mt-1  px-5 py-2">
					<input
						type="text"
						className="w-full border border-slate-200 rounded-full"
						placeholder="Tìm kiếm bác sĩ"
						onChange={handleSearchDoctor}
					/>
				</div>
			</div>
			<div className="bg-white p-5">
				<h3 className="text-lg pb-4">Bác sĩ nổi bật</h3>
				<div>
					{doctors?.length > 0 &&
						doctors?.map((item, index) => {
							return (
								<div
									key={index}
									className="flex items-center gap-5 border-b py-4"
								>
									<div className="flex flex-shrink-0 w-[60px] h-[60px]">
										<img
											src={
												item?.doctorInfoData?.image &&
												handleParseBufferImage(item?.doctorInfoData?.image)
											}
											alt=""
											className="w-full h-full object-cover rounded-full"
										/>
									</div>
									<div>
										<h4 className="font-medium">
											{infoPosFullName(item, lang)}
										</h4>
										<h5 className="font-normal">
											{item?.specialtyData?.nameVi}
										</h5>
									</div>
								</div>
							);
						})}
				</div>
			</div>
		</div>
	);
};

export default DoctorList;
