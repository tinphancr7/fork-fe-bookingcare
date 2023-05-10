import {useTranslation} from "react-i18next";

import {LANGUAGES} from "../../constants";
import {useDispatch} from "react-redux";
import {setLang} from "../../redux/features/langSlice";

export const Menu = () => {
	const {i18n, t} = useTranslation();
	const dis = useDispatch();
	const onChangeLang = (e) => {
		const lang_code = e.target.value;
		dis(setLang(lang_code));
		localStorage.setItem("language", lang_code);
		i18n.changeLanguage(lang_code);
	};

	return (
		<div>
			<select
				defaultValue={i18n.language}
				onChange={onChangeLang}
				className="border-none text-sm outline-none focus:ring-0"
			>
				{LANGUAGES.map(({code, label}) => (
					<option key={code} value={code}>
						{label}
					</option>
				))}
			</select>
		</div>
	);
};
