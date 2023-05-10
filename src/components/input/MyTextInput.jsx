import {useField} from "formik";

const MyTextInput = ({label, ...props}) => {
	// @ts-ignore
	const [field, meta] = useField(props);
	return (
		<div>
			<label
				className="block text-sm font-medium text-gray-700 pb-2 capitalize"
				htmlFor={props.id || props.name}
			>
				{label}
			</label>
			<input
				className=" w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
				type="text"
				{...field}
				{...props}
			/>
			{meta.touched && meta.error ? (
				<div className="text-sm text-red-500">{meta.error}</div>
			) : null}
		</div>
	);
};
export default MyTextInput;
