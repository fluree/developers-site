// @flow
// Original: https://github.com/dracula/visual-studio-code
// Converted automatically using ./tools/themeFromVsCode

var theme = {
	plain: {
		color: "#cef1ff",
		backgroundColor: "#000000",
	},
	styles: [
		{
			types: ["prolog", "constant", "builtin"],
			style: {
				color: "rgb(189, 147, 249)",
			},
		},
		{
			types: ["inserted", "function"],
			style: {
				color: "rgb(255, 76, 19)",
			},
		},
		{
			types: ["deleted"],
			style: {
				color: "rgb(255, 85, 85)",
			},
		},
		{
			types: ["changed"],
			style: {
				color: "rgb(255, 184, 108)",
			},
		},
		{
			types: ["punctuation", "symbol"],
			style: {
				color: "rgb(248, 248, 242)",
			},
		},
		{
			types: ["string", "char", "tag", "selector"],
			style: {
				color: "rgb(19, 198, 255)",
			},
		},
		{
			types: ["keyword", "variable"],
			style: {
				color: "rgb(14, 159, 110)",
				fontStyle: "italic",
			},
		},
		{
			types: ["comment"],
			style: {
				color: "rgb(104, 117, 245)",
			},
		},
		{
			types: ["attr-name"],
			style: {
				color: "rgb(241, 250, 140)",
			},
		},
	],
};

module.exports = theme;
