import {useEffect, useRef, useState} from "react";
import {toast} from "react-toastify";
import {getBase64} from "../utils/helpers";
const imageMimeType = /image\/(png|jpg|jpeg)/i;
const useFileImage = () => {
	const fileInputRef = useRef();
	const [file, setFile] = useState(null);
	const [fileDataURL, setFileDataURL] = useState(null);
	const changeHandler = (e) => {
		const file = e.target.files[0];
		if (!file.type.match(imageMimeType)) {
			toast.error("Image mime type is not valid");
			return;
		}
		setFile(file);
	};
	const handleResetFile = () => {
		if (fileInputRef.current) {
			// @ts-ignore
			fileInputRef.current.value = null;
			setFileDataURL(null);
		}
	};
	useEffect(() => {
		if (file) {
			getBase64(file).then((data) => {
				setFileDataURL(data);
			});
		}
	}, [file]);
	return {
		file,
		fileDataURL,
		setFile,
		setFileDataURL,
		changeHandler,
		handleResetFile,
		fileInputRef,
	};
};

export default useFileImage;
