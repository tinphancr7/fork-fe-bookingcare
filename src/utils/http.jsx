import axios from "axios";

const http = axios.create({
	baseURL: "http://localhost:8080/api",
	timeout: 1000,
	headers: {
		"Content-Type": "application/json",
	},
});
const base_url = "http://localhost:8080/api";

export {base_url, http};
