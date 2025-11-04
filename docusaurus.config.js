const lightCodeTheme = require("./src/theme/flureeTheme");
const darkCodeTheme = require("./src/theme/flureeTheme");

// const shiki = require("shiki");
const codeHikeTheme = require("./src/theme/flureeCodeHikeTheme");
const { remarkCodeHike } = require("@code-hike/mdx");

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
	title: "Fluree Developers",
	tagline: "Semantic graph data management system built with web3 tech",
	url: "https://next.developers.flur.ee",
	baseUrl: "/",
	trailingSlash: true,
	onBrokenLinks: "throw",
	onBrokenMarkdownLinks: "throw",
	favicon: "img/favicon.ico",
	organizationName: "fluree", // GitHub org name.
	projectName: "developers-site", // Repo name.
	/** @type {import('@docusaurus/preset-classic').ThemeConfig} */
	themeConfig: {
		image: "img/FlureeDevsBanner.jpg",
		colorMode: {
			// light | dark
			defaultMode: "light",

			// remove default sun-moon icons for dark mode switch
			// switchConfig: {
			//   darkIcon: " ",
			//   lightIcon: " ",
			// },
		},
		announcementBar: {
			id: "new dev site announcement bar",
			content:
				'Welcome to the new fluree developers site! Try the new search feature to find what you are looking for. You can visit <a href="https://docsarchive.flur.ee" target="_blank">docsarchive.flur.ee</a> for older versions of fluree docs.',
			backgroundColor: "#4B56A5",
			textColor: "white",
			isCloseable: true,
		},
		navbar: {
			// title: 'Fluree',
			hideOnScroll: true,
			// Main logo which links to fluree marketing site
			logo: {
				alt: "Fluree Yeti Logo",
				src: "img/fluree-logo@3x.png",
				srcDark: "img/fluree-logo@3x-white.png",
				href: "https://flur.ee",
			},

			// Navbar links - left aligned
			items: [
				{
					// Home Link
					label: "/docs",
					to: "/",
					position: "left",
					className: "navbar-home-link",
				},
				{
					label: "Learn",
					to: "/learn",
					docId: "learn/overview",
					type: "doc",
					position: "left",
				},
				{
					label: "Reference",
					to: "/refence",
					docId: "reference/http-api",
					type: "doc",
					position: "left",
				},
				{
					label: "Examples",
					to: "/examples",
					docId: "examples/datasets/academic-credentials/introduction",
					type: "doc",
					position: "left",
				},
				{
					label: "Fluree Cloud",
					to: "/cloud",
					docId: "cloud/welcome",
					type: "doc",
					position: "left",
				},
				{
					label: "Community",
					to: "community/",
					position: "left",
				},

				// Docusaurus template stuff
				// { to: '/blog', label: 'Blog', position: 'left' },

				// Navbar links - right aligned
				{
					href: "https://data.flur.ee/",
					label: "Get Started Free",
					position: "right",
				},
				// {
				// 	href: "https://github.com/fluree/developers-site",
				// 	className: "header-github-link",
				// 	position: "right",
				// 	"aria-label": "Github repository",
				// },
			],
		},

		// Config for collapsing sidebar
		docs: {
			sidebar: {
				hideable: true,
			},
		},
		footer: {
			style: "dark",
			logo: {
				alt: "Fluree Yeti Logo",
				src: "img/fluree-logo.png",
				href: "https://flur.ee",
			},
			copyright: `
				Copyright © ${new Date().getFullYear()} Fluree, PBC.
				Built with Docusaurus, Diataxis, and ♥️.
			`,
			links: [
				{
					title: "Docs",
					items: [
						{
							label: "Tutorial",
							to: "docs/learn/tutorial/introduction/",
						},
						{
							label: "Examples",
							to: "docs/examples/home/",
						},
						{
							label: "Reference",
							to: "/docs/reference/http-api/",
						},
						{
							label: "Fluree Cloud",
							to: "/docs/cloud/welcome",
						},
					],
				},
				{
					title: "Community",
					items: [
						{
							label: "Discord",
							href: "https://discord.gg/pgjsvPa9Nm",
						},
						{
							label: "Twitter",
							href: "https://twitter.com/flureepbc",
						},
					],
				},
				{
					title: "Media",
					items: [
						{
							label: "Blog",
							href: "https://flur.ee/blog",
						},
						{
							label: "YouTube",
							href: "https://youtube.com/c/fluree",
						},
						{
							label: "Dev.to",
							href: "https://dev.to/fluree",
						},
						{
							label: "GitHub",
							href: "https://github.com/fluree",
						},
					],
				},
			],
		},
		// Config for themeing syntax highlighting
		prism: {
			theme: lightCodeTheme,
			darkTheme: darkCodeTheme,
			additionalLanguages: ["turtle", "sparql", "clojure", "http", "xml-doc"],
		},
		algolia: {
			apiKey: "4c0aaa58c68d9cf5b2bf2da86d6579b5",
			appId: "V5ALV77PN7",
			indexName: "prod_dev_site",
		},
		baseUrlIssueBanner: false, // Defaults to `true`,
		mermaid: {
			theme: "base",
			themeVariables: {
				primaryColor: "#c6d4ff",
				primaryBorderColor: "#c6d4ff",
				lineColor: "#c6d4ff",
				secondaryColor: "#d5f5f6",
				secondaryTextColor: "#fef4ff",
				tertiaryColor: "#fff",
			},
		},
	},
	presets: [
		[
			"@docusaurus/preset-classic",
			/** @type {import('@docusaurus/preset-classic').Options} */
			{
				docs: {
					sidebarPath: require.resolve("./sidebars.js"),
					// editUrl: "https://github.com/fluree/developers-site/edit/main/",
					beforeDefaultRemarkPlugins: [
						[
							remarkCodeHike,
							{
								lineNumbers: false,
								showCopyButton: true,
								theme: codeHikeTheme,
								skipLanguages: ["mermaid"],
								autoImport: true,
							},
						],
					],
				},
				gtag: {
					// You can also use your "G-" Measurement ID here.
					trackingID: "G-XDLKYE388T",
					// Optional fields.
					anonymizeIP: true, // Should IPs be anonymized?
				},
				// blog: {
				//   showReadingTime: true,
				//   // TODO: Please change this to your repo.
				//   editUrl:
				//     'https://github.com/fluree/docs.flur.ee',
				//   // editUrl:
				//   //   'https://github.com/fluree/docs.flur.ee/edit/master/website/blog/',
				// },
				theme: {
					customCss: [
						require.resolve("@code-hike/mdx/styles.css"),
						require.resolve("./src/css/custom.css"),
					],
				},
			},
		],
	],
	plugins: [
		async function myPlugin(context, options) {
			return {
				name: "docusaurus-tailwindcss",
				configurePostCss(postcssOptions) {
					// Appends TailwindCSS and AutoPrefixer.
					postcssOptions.plugins.push(require("tailwindcss"));
					postcssOptions.plugins.push(require("autoprefixer"));
					return postcssOptions;
				},
			};
		},
		[
			"@docusaurus/plugin-ideal-image",
			{
				quality: 70,
				max: 1030, // max resized image's size.
				min: 640, // min resized image's size. if original is lower, use that size.
				steps: 2, // the max number of images generated between min and max (inclusive)
				disableInDev: false,
			},
		],
	],
	scripts: [
		{
			// Object format.
			src: "/scripts/reo.js",
			async: true,
			// onLoad:
			//   typeof window !== "undefined" &&
			//   window.Reo &&
			//   window.Reo.init({ clientID: "cb8a71410d7f8f8" }),
		},
	],
};
