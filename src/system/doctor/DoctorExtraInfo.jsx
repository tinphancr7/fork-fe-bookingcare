import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {NumericFormat} from "react-number-format";
import {useSelector} from "react-redux";
import {useGetExtraInfoDoctorByIdQuery} from "../../redux/api/doctorApi";

const DoctorExtraInfo = ({doctorId}) => {
	const {data: extraInfo} = useGetExtraInfoDoctorByIdQuery(doctorId, {
		skip: !doctorId,
	});

	const [show, setShow] = useState(false);
	const {t} = useTranslation();
	// @ts-ignore
	const lang = useSelector((state) => state.reducer.lang.lang);

	return (
		<div>
			<div className="border-b border-slate-300">
				<h4>{t("patient.extra-info-doctor.text-address")}</h4>
				<p className="text-sm font-medium py-2">{extraInfo?.nameClinic}</p>
				<p className="text-sm font-light pb-2">{extraInfo?.addressClinic}</p>
			</div>
			<div className="py-2 text-sm flex gap-2">
				<span className=" font-medium text-slate-500">
					{t("patient.extra-info-doctor.text-price")}:
				</span>
				{!show && (
					<p>
						{lang === "vi" ? (
							<NumericFormat
								value={extraInfo?.priceextraInfo?.valueVi}
								displayType="text"
								allowLeadingZeros
								thousandSeparator=","
								suffix="đ"
							/>
						) : (
							<NumericFormat
								value={extraInfo?.priceextraInfo?.valueEn}
								displayType="text"
								allowLeadingZeros
								thousandSeparator=","
								suffix="$"
							/>
						)}{" "}
						<span
							className="text-primary cursor-pointer"
							onClick={() => setShow(!show)}
						>
							{t("patient.extra-info-doctor.detail")}
						</span>
					</p>
				)}
			</div>
			{show && (
				<div className="shadow rounded-md ">
					<div className="bg-[#eeeeee] p-2">
						<div className="flex justify-between items-center text-sm ">
							<span>{t("patient.extra-info-doctor.text-price")}</span>
							<span>
								{lang === "vi" ? (
									<NumericFormat
										value={extraInfo?.priceextraInfo?.valueVi}
										displayType="text"
										allowLeadingZeros
										thousandSeparator=","
										suffix="đ"
									/>
								) : (
									<NumericFormat
										value={extraInfo?.priceextraInfo?.valueEn}
										displayType="text"
										allowLeadingZeros
										thousandSeparator=","
										suffix="$"
									/>
								)}
							</span>
						</div>
						<p className="text-xs font-light">{extraInfo?.note}</p>
					</div>
					<div className="bg-[#e3e3e3] p-2 text-sm">
						{t("patient.extra-info-doctor.payment")}{" "}
						{lang === "vi"
							? extraInfo?.paymentextraInfo?.valueVi
							: extraInfo?.paymentextraInfo?.valueEn}
					</div>
					<div className="p-2 text-sm text-primary">
						<span className="cursor-pointer" onClick={() => setShow(false)}>
							{t("patient.extra-info-doctor.hide-price")}
						</span>
					</div>
				</div>
			)}
		</div>
	);
};

export default DoctorExtraInfo;
