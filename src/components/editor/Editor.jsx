import ReactQuill, {Quill} from "react-quill";
import EditorToolbar, {modules, formats} from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
import BlotFormatter from "quill-blot-formatter";
import {useField, useFormikContext} from "formik";
Quill.register("modules/blotFormatter", BlotFormatter);
export const Editor = ({label, name, ...props}) => {
	// @ts-ignore
	const [field, meta] = useField({name});
	const {setFieldValue} = useFormikContext();

	return (
		<div className="text-editor">
			<EditorToolbar />
			<ReactQuill
				theme="snow"
				modules={modules}
				formats={formats}
				value={field.value}
				onChange={(e) => setFieldValue(name, e)}
				{...props}
			/>
			{meta.touched && meta.error ? (
				<div className="text-sm text-red-500">{meta.error}</div>
			) : null}
		</div>
	);
};

export default Editor;
