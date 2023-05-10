/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		"./node_modules/flowbite/**/*.js",
	],
	theme: {
		extend: {
			fontFamily: {
				body: ["Montserrat", "sans-serif"],
			},

			colors: {
				primary: "#45c3d2",
				bgPrimary: "#f5f5f5",
				bgGray: "#eeeeee",
			},
		},
	},
	plugins: [require("flowbite/plugin"), require("@tailwindcss/line-clamp")],
};
