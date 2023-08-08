module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				darkest: "#062C43",
				dark: "#054569",
				normal: "#5591A9",
				light: "#9CCDDC",
				lightest: "#CED7E0",
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
