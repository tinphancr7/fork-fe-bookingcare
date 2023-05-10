import {useField, useFormikContext} from "formik";
import {useEffect, useState} from "react";
import Select from "react-select";

const CustomSelect = ({
	label,
	options,
	handleDoctorIdChange = (val) => {},
	...props
}) => {
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
			<Select
				name={props.name}
				options={options}
				// @ts-ignore
				onChange={(val) => setFieldValue(field.name, val.value)}
			/>
			{meta.touched && meta.error ? (
				<div className="text-sm text-red-500">{meta.error}</div>
			) : null}
		</div>
	);
};

export default CustomSelect;
