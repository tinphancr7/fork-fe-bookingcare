import {useField, useFormikContext} from "formik";

const MySelect = ({label, handleDoctorIdChange = () => {}, ...props}) => {
	const {setFieldValue} = useFormikContext();
	// @ts-ignore

	const [field, meta] = useField(props);
	const handleChange = (e) => {
		// @ts-ignore
		handleDoctorIdChange(e.target.value);
		setFieldValue(field.name, e.target.value);
	};

	return (
		<div className="flex flex-col  ">
			<label
				className="block text-sm font-medium text-gray-700 pb-2"
				htmlFor={props.id || props.name}
			>
				{label}
			</label>
			{props.name === "doctorId" ? (
				<select
					className="p-2 rounded-md border border-gray-100"
					// {...field}
					{...props}
					onChange={handleChange}
				/>
			) : (
				<select
					className="p-2 rounded-md border border-gray-100"
					{...field}
					{...props}
				/>
			)}

			{meta.touched && meta.error ? (
				<div className="text-sm text-red-500">{meta.error}</div>
			) : null}
		</div>
	);
};
export default MySelect;
