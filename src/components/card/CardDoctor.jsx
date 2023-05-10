import {useSelector} from "react-redux";
import useFileImage from "../../hooks/useFileImage";
import {handleParseBufferImage} from "../../utils/helpers";
import {Link} from "react-router-dom";

const CardDoctor = ({doctor}) => {
	// @ts-ignore
	const lang = useSelector((state) => state.reducer.lang.lang);
	let nameVi = `${doctor.positionData?.valueVi} , ${doctor.doctorInfoData?.lastName} ${doctor.doctorInfoData?.firstName}`;
	let nameEn = `${doctor.positionData?.valueEn}, ${doctor.doctorInfoData?.firstName} ${doctor.doctorInfoData?.lastName} `;

	return (
		<>
			<Link
				to={`/doctors/${doctor.id}`}
				className="flex flex-col gap-2  pb-10 pt-2 items-center justify-center border border-slate-300"
			>
				<img
					src={
						doctor.doctorInfoData?.image &&
						handleParseBufferImage(doctor.doctorInfoData?.image)
					}
					className="w-[100px] h-[100px] rounded-full "
					alt=""
				/>

				<h3 className="text-sm text-center text-[#111] hover:text-primary capitalize">
					{lang === "vi" ? nameVi : nameEn}
				</h3>
				<span className="text-sm text-center font-medium text-[#111] capitalize">
					{lang === "vi"
						? doctor.specialtyData?.nameVi
						: doctor.specialtyData?.nameEn}
				</span>
			</Link>
		</>
	);
};

export default CardDoctor;
