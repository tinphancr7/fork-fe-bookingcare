import {useSelector} from "react-redux";
import {
	option,
	option2,
	option3,
	option4,
	option5,
	option6,
	option7,
	option8,
} from "../assets";
import {Buffer} from "buffer";
import moment from "moment";
import {capitalize} from "lodash";
const services = [
	{
		title: " Khám",
		title2: "Chuyên khoa",
		img: option,
	},
	{
		title: "Khám",
		title2: "từ xa ",
		img: option2,
	},
	{
		title: "Khám",
		title2: "Tổng quát",
		img: option3,
	},
	{
		title: " Xét nghiệm",
		title2: "y học ",
		img: option4,
	},
	{
		title: " Sức khỏe ",
		title2: "tinh thần  ",
		img: option5,
	},
	{
		title: " Khám",
		title2: "nha khoa  ",
		img: option6,
	},
	{
		title: "  Gói",
		title2: "Phẫu thuật   ",
		img: option7,
	},
	{
		title: "  Sản phẩm",
		title2: "Y tế  ",
		img: option8,
	},
];

const getBase64 = (file) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});
};
const handleParseBufferImage = (image) => {
	let imageBase64 = new Buffer(image, "base64").toString("binary");
	return imageBase64;
};

const firstLetterUpperCase = (str) => {
	return str.charAt(0).toUpperCase() + str.slice(1);
};

const getDataAllCode = (data, lang, isDoctor = false) => {
	// @ts-ignore

	let res = data?.map((item) => {
		if (isDoctor) {
			return {
				value: item.id,
				label:
					lang === "vi"
						? `${item.lastName} ${item.firstName}`
						: `${item.firstName} ${item.lastName}`,
			};
		} else {
			return {
				value: item.keyMap,
				label: lang === "vi" ? item.valueVi : item.valueEn,
			};
		}
	});
	return res;
};

const buildTimeBooking = (bookingInfo, lang) => {
	let time =
		lang === "vi"
			? bookingInfo?.timeTypeData.valueVi
			: bookingInfo?.timeTypeData.valueEn;

	const date =
		lang == "vi"
			? moment(bookingInfo?.date, "DD/MM/YYYY")
			: moment(bookingInfo?.date, "DD/MM/YYYY").locale("en");
	const dayOfWeek =
		lang == "vi"
			? capitalize(date?.format("dddd"))
			: capitalize(date?.format("ddd"));

	return `${time} - ${dayOfWeek} ${bookingInfo?.date}`;
};
const infoPosFullName = (doctorInfo, lang) => {
	let pos =
		lang === "vi"
			? doctorInfo?.positionData.valueVi
			: doctorInfo?.positionData.valueEn;

	let fullName =
		lang === "en"
			? `${doctorInfo?.doctorInfoData?.firstName} ${doctorInfo?.doctorInfoData?.lastName}`
			: `${doctorInfo?.doctorInfoData?.lastName} ${doctorInfo?.doctorInfoData?.firstName}`;
	return `${pos} ${fullName}`;
};

const buildDoctorName = (bookingInfo, lang) => {
	let fullName =
		lang === "en"
			? `${bookingInfo?.doctorData?.firstName} ${bookingInfo?.doctorData?.lastName}`
			: `${bookingInfo?.doctorData?.lastName} ${bookingInfo?.doctorData?.firstName}`;
	return `${fullName}`;
};
export {
	services,
	getBase64,
	handleParseBufferImage,
	firstLetterUpperCase,
	getDataAllCode,
	buildTimeBooking,
	infoPosFullName,
	buildDoctorName,
};
