import {
	buildTimeBooking,
	handleParseBufferImage,
	infoPosFullName,
} from "../../utils/helpers";
import {useSelector} from "react-redux";
import {useGetDetailDoctorByIdQuery} from "../../redux/api/doctorApi";
import {useTranslation} from "react-i18next";
import {NumericFormat} from "react-number-format";

const ProfileDoctor = ({doctorId, isShow = false}) => {
	const {data: doctorInfo} = useGetDetailDoctorByIdQuery(doctorId);

	// @ts-ignore
	const bookingInfo = useSelector((state) => state.reducer.booking.bookingInfo);

	// @ts-ignore
	const lang = useSelector((state) => state.reducer.lang.lang);
	const {t} = useTranslation();
	return (
		<>
			{isShow ? (
				<div>
					<div className="flex gap-5">
						<div className="w-[100px] h-[100px] flex-shrink-0">
							<img
								src={
									doctorInfo?.doctorInfoData?.image &&
									handleParseBufferImage(doctorInfo?.doctorInfoData?.image)
								}
								className="w-full h-full rounded-full"
								alt=""
							/>
						</div>
						<div className="w-full">
							<h2 className="text-[#8bcfee] font-medium capitalize">
								{infoPosFullName(doctorInfo, lang)}
							</h2>
							{
								<p
									className="text-sm text-gray-500 pt-2 max-w-[500px]"
									dangerouslySetInnerHTML={{
										__html: doctorInfo?.Markdown?.description,
									}}
								></p>
							}
						</div>
					</div>
				</div>
			) : (
				<div>
					<div className="flex items-start gap-5 ">
						<img
							src={
								doctorInfo?.doctorInfoData?.image &&
								handleParseBufferImage(doctorInfo?.doctorInfoData?.image)
							}
							className="w-[80px] h-[80px] object-cover rounded-full"
							alt=""
						/>
						<div className="w-full">
							<h2 className="text-[#337abd] font-medium text-lg capitalize">
								{infoPosFullName(doctorInfo, lang)}
							</h2>
							<p className="text-sm">{buildTimeBooking(bookingInfo, lang)}</p>
							<p className="text-sm">
								{t("patient.booking-modal.booking-free")}
							</p>
						</div>
					</div>
					<p className="text-sm pt-2">
						<span>{t("patient.booking-modal.price")}</span>:
						{lang === "vi" ? (
							<NumericFormat
								value={doctorInfo?.priceData?.valueVi}
								displayType="text"
								allowLeadingZeros
								thousandSeparator=","
								suffix="VND"
								className="pl-2"
							/>
						) : (
							<NumericFormat
								value={doctorInfo?.priceData?.valueEn}
								displayType="text"
								allowLeadingZeros
								thousandSeparator=","
								suffix="$"
								className="pl-2"
							/>
						)}
					</p>
				</div>
			)}
		</>
	);
};

export default ProfileDoctor;
