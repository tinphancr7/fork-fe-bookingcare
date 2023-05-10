import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import {BrowserRouter} from "react-router-dom";
import "./i18n";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {persistor, store} from "./redux/store";
import {I18nextProvider} from "react-i18next";
import i18n from "./i18n";
import {Formik} from "formik";
ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<I18nextProvider i18n={i18n}>
						<App />
					</I18nextProvider>
				</PersistGate>
			</Provider>
		</BrowserRouter>
	</React.StrictMode>
);
