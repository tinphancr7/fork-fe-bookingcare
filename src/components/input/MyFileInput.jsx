import {useField} from "formik";

const MyFileInput = ({label, fileInputRef, changeHandler, ...props}) => {
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
				className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
				accept=".png, .jpg, .jpeg"
				type="file"
				// {...props}
				ref={fileInputRef}
				onChange={changeHandler}
			/>
			{meta.touched && meta.error ? (
				<div className="text-sm text-red-500">{meta.error}</div>
			) : null}
		</div>
	);
};
export default MyFileInput;
