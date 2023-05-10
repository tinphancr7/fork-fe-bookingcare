import {useField, useFormikContext} from "formik";
import DatePicker from "react-datepicker";
const CustomeDatePicker = ({label, ...props}) => {
	// @ts-ignore
	const [field, meta] = useField(props);
	const {setFieldValue} = useFormikContext();

	return (
		<div>
			<label
				className="text-base font-medium block pb-2"
				htmlFor={props.id || props.name}
			>
				{label}
			</label>
			<DatePicker
				dateFormat={"dd/MM/yyyy"}
				selected={(field.value && new Date(field.value)) || new Date()}
				onChange={(val) => {
					setFieldValue(field.name, val);
				}}
				className="w-full rounded-md border border-gray-300 "
			/>
			{meta.touched && meta.error ? (
				<div className="text-sm text-red-500">{meta.error}</div>
			) : null}
		</div>
	);
};

export default CustomeDatePicker;
