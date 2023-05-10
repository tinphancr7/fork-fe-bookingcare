import React, {useMemo, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {useGetSpecialtyByIdQuery} from "../redux/api/specialtyApi";
import {useSelector} from "react-redux";
import {getDataAllCode, handleParseBufferImage} from "../utils/helpers";
import ProfileDoctor from "../system/doctor/ProfileDoctor";
import DoctorExtraInfo from "../system/doctor/DoctorExtraInfo";
import {useGetDetailDoctorByIdQuery} from "../redux/api/doctorApi";
import ScheduleDoctor from "../system/doctor/ScheduleDoctor";
import {useGetAllCodeServiceQuery} from "../redux/api/userApi";
import {ImLocation2} from "react-icons/im";

const DetailSpecialty = () => {
	const {id} = useParams();
	const [location, setLocation] = useState("all");
	const {data} = useGetSpecialtyByIdQuery({id, location}, {skip: !id});

	// @ts-ignore
	const lang = useSelector((state) => state.reducer.lang.lang);
	const {data: provinces} = useGetAllCodeServiceQuery("province");
	const optionsProvince = useMemo(
		() => getDataAllCode(provinces, lang),
		[provinces, lang]
	);

	const handleSelectPro = (e) => {
		setLocation(e.target.value);
	};

	return (
		<div className="detail-specialty ">
			<div
				style={{
					backgroundImage: `url(${
						data?.image && handleParseBufferImage(data?.image)
					})`,
				}}
				className="bg-cover bg-no-repeat bg-center w-full h-auto "
			>
				<div
					style={{
						backgroundImage:
							"linear-gradient(rgba(255, 255, 255, 0.8),rgba(255, 255, 255, 0.9),rgba(255, 255, 255, 1))",
					}}
					className="w-full h-auto "
				>
					<div className="wrapper p-5">
						<h3 className="capitalize pb-5">
							{lang === "vi" ? data?.nameVi : data?.nameEn}
						</h3>
						<div
							className=""
							dangerouslySetInnerHTML={{
								__html: data?.description,
							}}
						></div>
					</div>
				</div>
			</div>

			<div className="bg-bgGray px-16">
				<div className="pt-5">
					<select
						id="countries"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[150px] p-2.5 "
						onChange={handleSelectPro}
					>
						<option value="all">Toàn quốc</option>
						{optionsProvince?.map((item) => (
							<option key={item.value} value={item.value}>
								{item.label}
							</option>
						))}
					</select>
				</div>
				{data?.doctorSpecialty?.map((item, index) => (
					<div
						key={index}
						className="grid grid-cols-2 gap-10 rounded-md p-4 mt-5  bg-white shadow"
					>
						<div className="border-r border-slate-200 pr-5">
							<ProfileDoctor doctorId={item?.doctorId} isShow={true} />
							<div className="flex gap-5">
								<Link
									className="text-sm text-primary"
									to={`/admin/doctors/${item?.doctorId}`}
								>
									Xem thêm
								</Link>
								<div className="flex gap-2 text-sm ">
									<span>
										<ImLocation2 size={15} />
									</span>

									<span>{item?.provinceData?.valueVi}</span>
								</div>
							</div>
						</div>
						<div>
							<ScheduleDoctor doctorId={item?.doctorId} />
							<DoctorExtraInfo doctorId={item?.doctorId} />
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default DetailSpecialty;
