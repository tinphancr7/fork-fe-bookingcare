import {useField, useFormikContext} from "formik";
import React from "react";
import ReactQuill from "react-quill";

const MyQuill = ({label, name, ...props}) => {
	const [field, meta] = useField({name});
	const {setFieldValue} = useFormikContext();
	return (
		<>
			<ReactQuill
				theme="snow"
				value={field.value}
				onChange={(e) => setFieldValue(name, e)}
				{...props}
			/>
			{meta.touched && meta.error ? (
				<div className="text-sm text-red-500">{meta.error}</div>
			) : null}
		</>
	);
};

export default MyQuill;
