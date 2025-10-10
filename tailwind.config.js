/** @type {import('tailwindcss').Config} */
const twConfig = require("tailwind-config/tailwind.config");

module.exports = {
	...twConfig,
	corePlugins: {
		preflight: false, // disable Tailwind's reset
	},

	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
		"./docs/**/*.mdx",
		"node_modules/fluree-ui/dist/**/*.{vue,js,ts,jsx,tsx}",
	], // my markdown stuff is in ../docs, not /src

	darkMode: ["class", '[data-theme="dark"]'], // hooks into docusaurus' dark mode settings
	plugins: [],
};
