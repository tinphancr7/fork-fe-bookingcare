import {isRejected, isRejectedWithValue} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
/**
 * Log a warning and show a toast!
 */
function isPayloadErrorMessage(payload) {
	return (
		typeof payload === "object" &&
		payload !== null &&
		"data" in payload &&
		typeof payload.data?.message === "string"
	);
}

export const rtkQueryErrorLogger = (api) => (next) => (action) => {
	// RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
	if (isRejected(action)) {
		if (action.error.name === "CustomError") {
			// Những lỗi liên quan đến quá trình thực thi
			toast.warn(action.error.message);
		}
	}

	if (isRejectedWithValue(action)) {
		if (isPayloadErrorMessage(action.payload)) {
			// Lỗi reject từ server chỉ có message thôi!

			toast.error(action.payload.data.message);
		}
	}

	return next(action);
};
