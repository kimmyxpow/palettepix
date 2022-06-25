module.exports = {
	content: ["./*.html"],
	darkMode: "class",
	theme: {
		extend: {
			fontFamily: {
				sans: ["Poppins", "sans-serif"],
			},
		},
	},
	daisyui: {
		themes: false,
	},
	plugins: [require("daisyui")],
};
