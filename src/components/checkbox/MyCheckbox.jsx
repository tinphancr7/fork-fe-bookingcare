import {useField} from "formik";

const MyCheckbox = ({children, ...props}) => {
	// @ts-ignore
	const [field, meta] = useField({...props, type: "checkbox"});
	return (
		<>
			<label htmlFor="MarketingAccept" className="flex gap-4">
				<input
					className="h-5 w-5 rounded-md border-gray-200 bg-white shadow-sm"
					type="checkbox"
					{...field}
					{...props}
				/>
				{children}
			</label>
			{meta.touched && meta.error ? (
				<div className="text-sm text-red-500">{meta.error}</div>
			) : null}
		</>
	);
};
export default MyCheckbox;
